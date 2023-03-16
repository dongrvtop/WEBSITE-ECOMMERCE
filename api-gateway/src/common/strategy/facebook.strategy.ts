import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifiedCallback } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: '982751452687664',
      clientSecret: 'fd484db9c14ba320fa871ee9d93c1916',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      // scope: ['public_profile'],
      // authType: 'reauthenticate',
      profileFields: [
        'id',
        'name',
        'gender',
        'profileUrl',
        'displayName',
        'photos',
        'emails',
        'birthday',
      ],
      scope: [
        'public_profile',
        'user_birthday',
        'user_photos',
        'user_gender',
        'user_link',
        'email',
      ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profileFields: any,
    done: VerifiedCallback,
  ): Promise<any> {
    const { id, displayName, gender, profileUrl, emails, photos } =
      profileFields;
    const user = {
      facebookId: id,
      email: profileFields._json.email,
      name: displayName,
      gender: gender,
      profileUrl,
      avatarUrl: photos[0].value,
      birthday: profileFields._json.birthday,
      accessToken,
    };
    done(null, user);
  }
}
