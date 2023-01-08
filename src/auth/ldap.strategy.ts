import * as Strategy from 'passport-ldapauth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LdapStrategy extends PassportStrategy(Strategy, 'ldap') {
  constructor() {
    super(
      {
        // 	passReqToCallback: true,
        // 	server: {
        // 		url: 'ldap://127.0.0.1:389',
        // 		bindDN: 'root',
        // 		bindCredentials: 'password',
        // 		searchBase: 'o=users,o=example.com',
        // 		searchFilter: '(uid={{username}})',
        // 		searchAttributes: ['displayName', 'mail'],
        // 	},
        // }, async (req: Request, user: any, done) => {
        // 	req.user = user;
        // 	return done(null, user);
        // });
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
        // req.user = user;
        req.user = {
          username: user.uid,
          email: user.mail,
        };

        console.log('REQQQQ USERRR ISSS : ', req.user);

        return done(null, user);
      },
    );
  }
}
