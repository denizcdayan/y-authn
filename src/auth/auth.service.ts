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
      const { password, ...result } = user; // do not send password
      return result;
    }
    return null;
  }

  async signup(user: any) {
    console.log('in AuthService.signup(), user: ', user);

    const u = await this.usersService.findOne(user.email);
    if (!u) {
      await this.usersService.addUser(user);
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    console.log('in AuthService.login(), user: ', user);
    // if first signin (and it is valid?), create the user
    // const u = await this.usersService.findOne(user.email);
    // if (!u) {
    //   await this.usersService.addUser(u);
    // }

    const payload = {
      username: user.username,
      sub: user.userId,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
