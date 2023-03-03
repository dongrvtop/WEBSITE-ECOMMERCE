import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, google } from 'googleapis';
import { Model } from 'mongoose';
import { RoleType } from 'src/constants/role-type';
import { CreateTokenDto } from 'src/user/dto/create-token.dto';
import { UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { SuccessResponse } from '../../../common/helpers';

@Injectable()
export class Oauth2Service {
  oauthGoogleClient: Auth.OAuth2Client;
  constructor(
    private readonly userService: UserService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {
    const googleClientID =
      '202494894639-ln5u34p2ir4ca0nnqo202gok7s6v4mln.apps.googleusercontent.com';
    const googleClientSecret = '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';
    const googleRedirectURI = 'localhost:3000/auth/google/callback';

    this.oauthGoogleClient = new google.auth.OAuth2({
      clientId: googleClientID,
      clientSecret: googleClientSecret,
      redirectUri: googleRedirectURI,
    });
  }

  async authenticate() {
    const scopes = [
      'https://www.googleapis.com/auth/contacts.readonly',
      'https://www.googleapis.com/auth/user.emails.read',
      'profile',
    ];
    const authorizeUrl = await this.oauthGoogleClient.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });
    console.log(`URL: ${JSON.stringify(authorizeUrl)}`);
    console.log(`URL: ${authorizeUrl}`);
    return authorizeUrl;
    // const tokenInfo = await this.oauthGoogleClient.getTokenInfo(accessToken);
    // const userId = tokenInfo.email;
    // try {
    //   // find user by email
    //   const user = await this.userModel
    //     .findOne({
    //       email: tokenInfo.email,
    //     })
    //     .exec();
    //   const payloadCreateToken: CreateTokenDto = {
    //     userId: user.id,
    //     role: user.role as RoleType,
    //   };
    //   const accessToken = await this.userService.createAccessToken(
    //     payloadCreateToken,
    //   );
    //   const refreshToken = await this.userService.createRefreshToken(
    //     payloadCreateToken,
    //   );
    //   return SuccessResponse.from({
    //     user,
    //     accessToken,
    //     refreshToken,
    //   });
    // } catch (error) {
    //   if (error.status !== 404) {
    //     return SuccessResponse.from(null, error.status, error.message);
    //   }
    //   // register user by google
    //   const newUser = await this.registerUserByGoogle(
    //     accessToken,
    //     tokenInfo.email,
    //   );
    //   return SuccessResponse.from(newUser.data);
    // }
  }

  async registerUserByGoogle(token: string, email: string) {
    const userData = await this.getUserDataByGoogleToken(token);
    const name = userData.name;

    const responseRegister = await this.userService.registerWithGoogle(
      email,
      name,
    );
    const payloadCreateToken: CreateTokenDto = {
      userId: responseRegister.data.id,
      role: responseRegister.data.role,
    };
    const accessToken = await this.userService.createAccessToken(
      payloadCreateToken,
    );
    const refreshToken = await this.userService.createRefreshToken(
      payloadCreateToken,
    );
    return SuccessResponse.from({
      user: responseRegister.data,
      accessToken,
      refreshToken,
    });
  }

  async getUserDataByGoogleToken(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthGoogleClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthGoogleClient,
    });

    return userInfoResponse.data;
  }
}
