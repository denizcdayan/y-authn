import { IsEmail, IsString } from 'class-validator';

export class CreateLdapUserDto {
  @IsString()
  username: string;

  // @IsString()
  // name: string;

  // @IsString()
  // surname: string;

  @IsEmail()
  email: string;
}
