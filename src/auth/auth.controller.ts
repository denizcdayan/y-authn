import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  NotAcceptableException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { CreateLdapUserDto } from '../users/dtos/create-ldap-user.dto';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { LdapAuthGuard } from '../auth/ldap-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('/signup')
  async signup(@Body() body: CreateUserDto) {
    return this.usersService.create(body.username, body.email, body.password);
  }

  @Post('/supersignup') // TODO: remove this later
  async supersignup(@Body() body: CreateUserDto) {
    return this.usersService.createAdmin(
      body.username,
      body.email,
      body.password,
    );
  }

  @UseGuards(LocalAuthGuard) // returns user obj
  @Post('/login')
  async login(@Body() body: LoginUserDto) {
    console.log('in AppController.login()');
    return this.authService.login(body.username);
  }

  @UseGuards(LdapAuthGuard)
  @Post('ldap/signup')
  async ldapSignup(@Body() body: CreateLdapUserDto) {
    console.log('in AppController.login(), user.email: ', body.email);
    // return this.authService.ldapSignup(body);
    return this.usersService.createLdapUser(body.email, body.username);
  }

  // @UseGuards(LdapAuthGuard)
  // @Post('ldap/signup')
  // async ldapSignup(@Request() req) {
  //   console.log('in AppController.login(), user.email: ', req.body.email);
  //   const { password, ...result } = req.body; // XXX: strip password manually
  //   return this.authService.signup(result);
  // }

  @UseGuards(LdapAuthGuard, LocalAuthGuard)
  @Post('ldap/login')
  async ldapLogin(@Request() req) {
    this.authService.ldapLogin();
    return this.authService.login(req.username);
  }
}
