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
    const user = await this.usersService.findOne(username);

    if (user) {
      const { email, roles, ...result } = user; // do not send password
      return result;
    }

    return null;
  }

  async getUser(username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const { email, roles, ...result } = user; // do not send password
      return result;
    }
    return null;
  }

  async getUserRole(username: string) {
    const user = await this.usersService.findOne(username);
    if (user) {
      return user.roles;
    }
    return null;
  }

  async signup(user: any) {
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
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async ldapLogin() {
    passport.authenticate('ldap', { session: false });
  }
}
