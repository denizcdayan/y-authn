import * as Strategy from 'passport-ldapauth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LdapStrategy extends PassportStrategy(Strategy, 'ldap') {
  constructor() {
    super(
      {
        passReqToCallback: true,
        server: {
          url: 'ldap://ldap.forumsys.com:389',
          bindDN: 'cn=read-only-admin,dc=example,dc=com',
          bindCredentials: 'password',
          searchBase: 'dc=example,dc=com',
          searchFilter: '(uid={{username}})',
          // searchAttributes: ['displayName', 'mail'],
        },
      },
      async (req: Request, user: any, done) => {
        req.user = {
          username: user.uid,
          email: user.mail,
        };

        return done(null, user);
      },
    );
  }
}
