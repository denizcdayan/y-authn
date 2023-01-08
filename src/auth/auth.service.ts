import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as passport from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('in AuthService.validateUser()');
    const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    if (user) {
      console.log('in AuthService.validateUser() ---> user validated');
      // const { password, email, roles, ...result } = user; // do not send password
      const { email, roles, ...result } = user; // do not send password
      return result;
    }
    console.log('in AuthService.validateUser() ---> user NOT validated');
    return null;
  }

  async getUser(username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      console.log('in AuthService.getUser() ---> user is found');
      // const { password, email, roles, ...result } = user; // do not send password
      const { email, roles, ...result } = user; // do not send password
      return result;
    }
    console.log('in AuthService.getUser() ---> user is NOT found');
    return null;
  }

  async getUserRole(username: string) {
    console.log('in AuthService.getUserRole()');
    const user = await this.usersService.findOne(username);
    if (user) {
      console.log('in AuthService.getUserRole(), user roles are: ', user.roles);
      return user.roles;
    }
    return null;
  }

  async signup(user: any) {
    console.log('in AuthService.signup(), user: ', user);

    const u = await this.usersService.findOne(user.username);
    if (!u) {
      await this.usersService.addUser(user);
      const { result } = user;
      return result;
    } else {
      throw new NotAcceptableException('user already exists');
    }

    return null;
  }

  async login(user: any) {
    console.log('in AuthService.login(), user: ', user);

    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async ldapLogin() {
    passport.authenticate('ldap', { session: false });
  }
}
