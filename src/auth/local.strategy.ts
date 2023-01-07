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

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log('__LocalStrategy.validate()___ user: ', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

// Passport automatically creates a user object,
// based on the value we return from the validate() method,
// and assigns it to the Request object as req.user
// --> Later, we'll replace this with code to create and return a JWT instead
