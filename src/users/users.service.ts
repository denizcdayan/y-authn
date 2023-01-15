import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findOne(username: string) {
    return this.repo.findOneBy({ username });
  }

  async find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async getAll() {
    // return this.repo.
  }

  async update(username: string, attrs: Partial<User>) {
    const user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(username: string) {
    const user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return this.repo.remove(user);
  }

  async create(username: string, email: string, password: string) {
    const user = this.repo.create({ username, email, password });

    return await this.repo.save(user);
  }

  async createLdapUser(username: string, email: string) {
    const isFromLdap = true;
    const user = this.repo.create({ username, email, isFromLdap });

    return await this.repo.save(user);
  }

  // TODO: delete this later
  async createAdmin(username: string, email: string, password: string) {
    const role = Role.Admin;

    const user = this.repo.create({
      username,
      email,
      password,
      role,
    });

    return await this.repo.save(user);
  }

  async getRole(username: string) {
    const user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user.role;
  }
}
