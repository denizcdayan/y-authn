import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/auth/enums/role.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  username: string;

  // @Column()
  // name: string;

  // @Column()
  // surname: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  // @Column()
  // roles: Role[];

  @Column({
    type: 'simple-enum',
    enum: Role,
    default: Role.User,
  })
  @Exclude()
  role: Role;

  @Column({ default: false })
  isFromLdap: boolean;

  // @Column()
  // role: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with username: ', this.username);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with username: ', this.username);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with username: ', this.username);
  }
}
