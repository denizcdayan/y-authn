import {
  Controller,
  Request,
  UseGuards,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Roles } from './auth/decorators/roles.decorator';
import { Role } from './auth/enums/role.enum';
import { RolesGuard } from './auth/guards/roles.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // Dummy routes

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/dummyroute/admin-only-endpoint')
  @UseInterceptors(ClassSerializerInterceptor) // to exclude password. see user.entity --> @Exclude()
  async adminOnlyContr(@Request() req) {
    return console.log('In adminOnlyContr, user role is ', req.user.role);
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/dummyroute/user-only-endpoint')
  async userOnlyContr(@Request() req) {
    return console.log('In userOnlyContr');
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/dummyroute/all-roles-endpoint')
  async allRolesContr(@Request() req) {
    return console.log('In allRolesContr');
  }
}
