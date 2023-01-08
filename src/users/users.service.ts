import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';

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
    return this.users.find((user) => user.username === username);
  }

  async addUser(newUser: any) {
    newUser.userId = this.users.length + 1;
    newUser.roles = Role.User;
    this.users.push(newUser);
    return true;
  }
}
