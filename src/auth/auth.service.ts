import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

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
      const { password, email, roles, ...result } = user; // do not send password
      return result;
    }
    console.log('in AuthService.validateUser() ---> user NOT validated');
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

  // async signup(user: any) {
  //   console.log('in AuthService.signup(), user: ', user);

  //   const u = await this.usersService.findOne(user.username);
  //   if (!u) {
  //     await this.usersService.addUser(user);
  //     const { password, ...result } = user;
  //     return result;
  //   }

  //   return null;
  // }

  async login(user: any) {
    console.log('in AuthService.login(), user: ', user);

    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
