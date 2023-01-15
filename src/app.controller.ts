import {
  Controller,
  Request,
  Post,
  Delete,
  Patch,
  Query,
  UseGuards,
  Get,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';

// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Roles } from './auth/decorators/roles.decorator';
import { Role } from './auth/enums/role.enum';
import { RolesGuard } from './auth/guards/roles.guard';

import { CreateUserDto } from './users/dtos/create-user.dto';
import { UpdateUserDto } from './users/dtos/update-user.dto';
import { LoginUserDto } from './users/dtos/login-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return this.usersService.create(body.username, body.email, body.password);
  }

  @Post('supersignup') // TODO: remove this later
  async supersignup(@Body() body: CreateUserDto) {
    return this.usersService.createAdmin(
      body.username,
      body.email,
      body.password,
    );
  }

  @UseGuards(LocalAuthGuard) // returns user obj
  @Post('login')
  async login(@Body() body: LoginUserDto) {
    console.log('in AppController.login()');
    return this.authService.login(body.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:username')
  @UseInterceptors(ClassSerializerInterceptor) // to exclude password. see user.entity --> @Exclude()
  async getProfile(@Param('username') username: string) {
    const user = this.authService.findUser(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:username')
  removeUser(@Param('username') username: string) {
    return this.usersService.remove(username);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:username')
  updateUser(@Param('username') username: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(username, body);
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
