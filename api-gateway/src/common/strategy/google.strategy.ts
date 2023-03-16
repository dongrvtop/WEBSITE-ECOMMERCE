import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifiedCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configSerivce: ConfigService) {
    super({
      // clientID:
      //   '202494894639-ln5u34p2ir4ca0nnqo202gok7s6v4mln.apps.googleusercontent.com',
      // clientSecret: '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',
      // callbackURL: 'http://localhost:3000/auth/google/callback',
      // scope: ['email', 'profile'],
      clientID: configSerivce.get('googleClientID'),
      clientSecret: configSerivce.get('googleClientSecret'),
      callbackURL: configSerivce.get('googleRedirectURI'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user = {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      avatarUrl: photos[0].value,
      accessToken,
    };
    // return user;
    done(null, user);
  }
}
