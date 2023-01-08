// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Roles } from './auth/decorators/roles.decorator';
import { Role } from './auth/enums/role.enum';
// import { CreateUserDto } from './users/create-user.dto';
import { RolesGuard } from './auth/guards/roles.guard';
import { UsersModule } from './users/users.module';

// @UseGuards(RolesGuard)
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('signup')
  async signup(@Request() req) {
    console.log('in AppController.login(), user.email: ', req.body.email);
    return this.authService.signup(req.body);
  }

  @UseGuards(LocalAuthGuard) // returns user obj
  @Post('auth/login')
  async login(@Request() req) {
    console.log('in AppController.login()');
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log('in AppController.getProfile()');
    return req.user;
  }

  // Dummy routes

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin-only-route')
  async adminOnlyContr(@Request() req) {
    return console.log('In adminOnlyContr, user role is ', req.user.roles);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user-only-route')
  async userOnlyContr(@Request() req) {
    return console.log('In userOnlyContr');
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all-roles-route')
  async allRolesContr(@Request() req) {
    return console.log('In allRolesContr');
  }
}
