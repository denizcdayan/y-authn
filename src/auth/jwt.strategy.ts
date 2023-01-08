import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // our response to the validate() callback is trivial:
    // we simply return an object containing the userId and username properties.

    // we can insert some business logic in here
    // e.g: put more info to our user object (created automatically by passport)

    console.log('__JwtStrategy.validate()___ enter');
    console.log('__JwtStrategy.validate()___ payload: ', payload);

    const urole = await this.authService.getUserRole(payload.username);
    payload.roles = urole;

    return {
      userId: payload.sub,
      username: payload.username,
      roles: urole,
    };
  }
}

// Passport first verifies the JWT's signature
// and decodes the JSON.
// It then invokes our validate() method
// passing the decoded JSON as its single parameter.
// Based on the way JWT signing works,
// we're guaranteed that we're receiving a valid token
// that we have previously signed and issued to a valid user
