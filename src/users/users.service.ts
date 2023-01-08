import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  username: string;
  email: string;
  // password: string;
  roles: Role;
};

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users = [
    {
      userId: 1,
      username: 'john',
      email: 'john@mail.com',
      // password: 'changeme',
      roles: Role['Admin'],
    },
    {
      userId: 2,
      username: 'maria',
      email: 'maria@mail.com',
      // password: 'guess',
      roles: Role['User'],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    console.log('inside UsersService.findOne()');
    return this.users.find((user) => user.username === username);
  }

  async create() {
    return console.log('inside UsersService.create()');
  }

  async addUser(newUser: any) {
    console.log('inside UsersService.addUser()');
    newUser.userId = this.users.length + 1;
    newUser.roles = Role.User;
    this.users.push(newUser);
    console.log(this.users);
    return true;
  }
}
