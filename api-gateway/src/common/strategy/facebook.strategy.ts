import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifiedCallback } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID:
        '982751452687664',
      clientSecret: 'fd484db9c14ba320fa871ee9d93c1916',
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      // scope: ['public_profile'],
      // authType: 'reauthenticate',
      profileFields: ['id', 'displayName', 'photos', 'email', 'birthday'],
      // scope: ['user_friends', 'manage_pages'],
      scope: ['public_profile','user_birthday', 'user_photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profileFields: any,
    done: VerifiedCallback,
  ): Promise<any> {
    const { id, displayName, email, photos, birthday } = profileFields;
    const user = {
      facebookUserId: id,
      email: email,
      firstName: displayName,
      lastName: displayName,
      picture: photos[0],
      birthday,
      accessToken,
      refreshToken,
    };
    console.log(`USER: ${JSON.stringify(user)}`);
    done(null, user);
  }
}
