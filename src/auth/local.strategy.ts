import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string): Promise<any> {
    const user = await this.authService.getUser(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
