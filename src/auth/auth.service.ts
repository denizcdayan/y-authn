import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as passport from 'passport';
import { CreateLdapUserDto } from 'src/users/dtos/create-ldap-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('in AuthService.validateUser()');
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      console.log('in AuthService.validateUser() ---> user validated');
      const { password, email, role, ...result } = user; // do not send password
      return result;
    }
    console.log('in AuthService.validateUser() ---> user NOT validated');
    return null;
  }

  async getUserRole(username: string) {
    // console.log('in AuthService.getUserRole()');
    // const user = await this.usersService.findOne(username);
    // if (user) {
    //   console.log('in AuthService.getUserRole(), user roles are: ', user.roles);
    //   return user.roles;
    // }
    // return null;

    return this.usersService.getRole(username);
  }

  async login(username: string) {
    const payload = { username: username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findUser(username: string) {
    const user = await this.usersService.findOne(username);

    return user;
  }

  async ldapLogin() {
    passport.authenticate('ldap', { session: false });
  }

  // async ldapSignUp(user: CreateLdapUserDto) {
  //   const u = await this.usersService.create(user.username);
  //   if (!u) {
  //     await this.usersService.addUser(user);
  //     const { result } = user;
  //     return result;
  //   } else {
  //     throw new NotAcceptableException('user already exists');
  //   }

  //   return null;
  // }
}
