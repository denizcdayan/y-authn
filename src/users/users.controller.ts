// import {
//   Body,
//   Controller,
//   Post,
//   Get,
//   Patch,
//   Param,
//   Delete,
//   Query,
//   NotFoundException,
//   UseInterceptors,
//   ClassSerializerInterceptor,
//   UseGuards,
// } from '@nestjs/common';
// import { CreateUserDto } from './dtos/create-user.dto';
// import { UpdateUserDto } from './dtos/update-user.dto';
// import { UsersService } from './users.service';
// import { AuthService } from 'src/auth/auth.service';

// @Controller('authsdfsdfsdf')
// export class UsersController {
//   constructor(
//     private usersService: UsersService,
//     private authService: AuthService,
//   ) {}

//   @Post('signup')
//   async signup(@Body() body: CreateUserDto) {
//     // console.log('in AppController.login(), user.email: ', req.body.email);
//     // return this.authService.signup(req.body);
//     this.usersService.create(body.username, body.email, body.password);
//   }

//   @Get('/:username')
//   @UseInterceptors(ClassSerializerInterceptor) // to exclude password. see user.entity --> @Exclude()
//   async findUser(@Param('username') username: string) {
//     const user = await this.usersService.findOne(username);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     return user;
//   }

//   @Get()
//   findAllUsers(@Query('email') email: string) {
//     return this.usersService.find(email);
//   }

//   @Delete('/:username')
//   removeUser(@Param('username') username: string) {
//     return this.usersService.remove(username);
//   }

//   @Patch(':/username')
//   updateUser(@Param('username') username: string, @Body() body: UpdateUserDto) {
//     return this.usersService.update(username, body);
//   }
// }
