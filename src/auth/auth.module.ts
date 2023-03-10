import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { LdapStrategy } from './ldap.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, LdapStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

// verify phase performed by Passport,
// and the sign phase performed in our AuthService
