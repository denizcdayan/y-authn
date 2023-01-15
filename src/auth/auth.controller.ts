import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginUserDto } from '../users/dtos/login-user.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';

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
}
