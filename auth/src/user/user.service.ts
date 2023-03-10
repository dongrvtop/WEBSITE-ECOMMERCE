import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import { TokenType } from 'src/constants/token-type';
import { RoleType } from 'src/constants/role-type';
import { SuccessResponse, StatusCode } from '../constants/index';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import * as express from 'express';
import { CreateUserWithGoogle } from './dto/create-user-with-google.dto';
import { UserType } from './enum/user-type';
import { UserProvider } from './enum/user-provider';
import { CreateUserWithFacebook } from './dto/create-user-with-facebook';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(data: CreateUserDto) {
    const checkUser = await this.userModel
      .findOne({ userName: data.userName })
      .exec();
    if (checkUser) {
      return SuccessResponse.from(
        null,
        StatusCode.BAD_REQUEST,
        'Username was availble. Please choose another one.',
      );
    }
    data.password = await bcrypt.hash(data.password, 10);
    await this.userModel.create(data);
    let user = await this.userModel.findOne({ userName: data.userName }).exec();
    const createTokenPayload: CreateTokenDto = {
      userId: user._id.toString(),
      role: (user.role as RoleType) ?? RoleType.USER,
    };
    const accessToken = await this.createAccessToken(createTokenPayload);
    const refreshToken = await this.createRefreshToken(createTokenPayload);
    // user.refreshToken = refreshToken.token;
    // user.save();
    await this.userModel.findByIdAndUpdate(user._id, {
      refreshToken: refreshToken.token,
    });
    delete user.password;
    delete user.refreshToken;
    const response = {
      user,
      accessToken,
      refreshToken,
    };
    return SuccessResponse.from(response);
  }

  async login(data: UserLoginDto) {
    const user = await this.validateUser(data);
    if (!user) {
      return SuccessResponse.from(
        null,
        StatusCode.BAD_REQUEST,
        'Username does not exist.',
      );
    }
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (!checkPassword) {
      return SuccessResponse.from(
        null,
        StatusCode.BAD_REQUEST,
        'Password is incorrect. Please try again.',
      );
    }
    const createTokenPayload: CreateTokenDto = {
      userId: user._id.toString(),
      role: (user.role as RoleType) ?? RoleType.USER,
    };
    const accessToken = await this.createAccessToken(createTokenPayload);
    const refreshToken = await this.createRefreshToken(createTokenPayload);
    // user.refreshToken = refreshToken.token;
    await this.userModel
      .findByIdAndUpdate(user._id, { refreshToken: refreshToken.token })
      .exec();
    delete user.password;
    const response = {
      user,
      accessToken,
      refreshToken,
    };
    return SuccessResponse.from(response);
  }

  async googleLogin(user: any) {
    if (!user) {
      return SuccessResponse.from(
        null,
        StatusCode.BAD_REQUEST,
        'No user from gooogle',
      );
    }
    return SuccessResponse.from(user);
  }

  async facebookLogin(user: any) {
    if (!user) {
      return SuccessResponse.from(
        null,
        StatusCode.BAD_REQUEST,
        'No user from facebook',
      );
    }
    return SuccessResponse.from(user);
  }

  async validateUser(data: UserLoginDto) {
    const user = await this.userModel
      .findOne({ userName: data.userName })
      .exec();
    if (user) {
      return user;
    }
    return null;
  }

  async createAccessToken(
    data: CreateTokenDto,
    userType: UserType = UserType.WITH_NORMAL,
  ) {
    data.type = TokenType.ACCESS_TOKEN;
    let expiresIn;
    switch (userType) {
      case UserType.WITH_GOOGLE:
        expiresIn = await this.configService.get(
          'JWT_GOOGLE_EXPIRES_ACCESS_TOKEN',
        );
        break;
      default:
        expiresIn = await this.configService.get('JWT_EXPIRES_ACCESS_TOKEN');
        break;
    }
    const accessToken = await this.jwtService.signAsync(data, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn,
    });
    return new TokenResponseDto({
      expiresIn,
      token: accessToken,
    });
  }

  async createRefreshToken(data: CreateTokenDto) {
    data.type = TokenType.REFRESH_TOKEN;
    const refreshToken = await this.jwtService.signAsync(data, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_REFRESH_TOKEN'),
    });
    return new TokenResponseDto({
      expiresIn: this.configService.get('JWT_EXPIRES_REFRESH_TOKEN'),
      token: refreshToken,
    });
  }

  async refreshAccessToken(data: RefreshAccessTokenDto) {
    try {
      const tokenInfo = await this.validateToken(data.refreshToken);
      if (!tokenInfo) {
        return SuccessResponse.from(
          null,
          StatusCode.BAD_REQUEST,
          'Refresh token has expired',
        );
      }
      const user = await this.userModel.findById(tokenInfo.userId).exec();
      console.log('data', data.refreshToken);
      console.log('user', user.refreshToken);

      if (data.refreshToken !== user.refreshToken) {
        return SuccessResponse.from(
          null,
          StatusCode.BAD_REQUEST,
          'Refresh token incorrect',
        );
      }
      const createAccessTokenPayload: CreateTokenDto = {
        userId: user._id.toString(),
        role: (user.role as RoleType) ?? RoleType.USER,
        email: user.email ?? null,
      };
      const accessToken = await this.createAccessToken(
        createAccessTokenPayload,
      );
      const response = {
        user,
        accessToken,
      };
      return SuccessResponse.from(response);
    } catch (error) {
      return SuccessResponse.from(null, StatusCode.FOR_BIDDEN, error.message);
    }
  }

  private async validateToken(token: string) {
    try {
      const tokenInfo = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      return tokenInfo;
    } catch (e) {
      return null;
    }
  }

  async getUser(token: string) {
    try {
      const res = await this.jwtService.verifyAsync(token);
      return res;
    } catch (error) {
      return 'Token expired';
    }
  }

  // Service for Google OAuth2
  //#region
  async registerWithGoogle(user: CreateUserWithGoogle) {
    // const firstName = name.substring(name.lastIndexOf(" ") +1);
    // const lastName = name.substring(name.lastIndexOf(" "), -1);
    try {
      const newUser = await this.userModel.create({
        email: user.email,
        googleId: user.googleId,
        firstName: user.firstName,
        lastName: user.lastName,
        role: RoleType.USER,
        avatarUrl: user.avatarUrl,
        provider: [UserProvider.GOOGLE],
      });
      console.log(newUser._id.toString());
      const createTokenPayload: CreateTokenDto = {
        email: newUser.email,
        type: TokenType.ACCESS_TOKEN,
        role: RoleType.USER,
        userId: newUser._id.toString(),
      };
      const accessToken = await this.createAccessToken(
        createTokenPayload,
        UserType.WITH_GOOGLE,
      );
      const refreshToken = await this.createRefreshToken(createTokenPayload);
      await this.userModel.findOneAndUpdate(
        { email: user.email },
        {
          $set: { refreshToken: refreshToken.token },
        },
      );
      const dataUser = await this.userModel.findOne({ email: user.email });
      const response = {
        accessToken,
        refreshToken,
        user: dataUser,
      };
      return SuccessResponse.from(response);
    } catch (error) {
      return SuccessResponse.from(null, StatusCode.FOR_BIDDEN, error.message);
    }
  }

  async loginWithGoogle(user: CreateUserWithGoogle) {
    try {
      const validateUser = await this.validateUserByEmail(user.email);
      let newUser;
      if (!validateUser) {
        return await this.registerWithGoogle(user);
      } else {
        if (!validateUser.provider.includes(UserProvider.GOOGLE)) {
          const provider: string[] = validateUser.provider;
          provider.push(UserProvider.GOOGLE);
          newUser = await this.userModel
            .findOneAndUpdate(
              { email: user.email },
              {
                $set: {
                  googleId: user.googleId,
                  provider: provider,
                },
              },
            )
            .exec();
        } else {
          newUser = validateUser;
        }
      }
      const createTokenPayload: CreateTokenDto = {
        email: newUser.email,
        type: TokenType.ACCESS_TOKEN,
        role: RoleType.USER,
        userId: newUser._id.toString(),
      };
      const accessToken = await this.createAccessToken(
        createTokenPayload,
        UserType.WITH_GOOGLE,
      );
      const refreshToken = await this.createRefreshToken(createTokenPayload);
      await this.userModel.findOneAndUpdate(
        { email: user.email },
        {
          $set: { refreshToken: refreshToken.token },
        },
      );
      const dataUser = await this.userModel
        .findOne({
          email: user.email,
        })
        .exec();
      const response = {
        accessToken,
        refreshToken,
        user: dataUser,
      };
      return SuccessResponse.from(response);
    } catch (error) {
      return SuccessResponse.from(null, StatusCode.FOR_BIDDEN, error.message);
    }
  }

  async validateUserByEmail(email: string) {
    const user = await this.userModel
      .findOne({
        email,
      })
      .exec();
    if (!user || !email) {
      return null;
    }
    return user;
  }
  //#region

  // Service for Facebook OAuth2
  //#region
  async registerWithFacebook(user: CreateUserWithFacebook) {
    // const firstName = name.substring(name.lastIndexOf(" ") +1);
    // const lastName = name.substring(name.lastIndexOf(" "), -1);
    try {
      const newUser = await this.userModel.create({
        email: user.email,
        facebookId: user.facebookId,
        firstName: user.name.substring(user.name.lastIndexOf(' ') + 1),
        lastName: user.name.substring(user.name.lastIndexOf(' '), -1),
        role: RoleType.USER,
        avatarUrl: user.avatarUrl,
        birthday: user.birthday,
        provider: UserProvider.FACEBOOK,
      });
      const createTokenPayload: CreateTokenDto = {
        email: newUser.email,
        type: TokenType.ACCESS_TOKEN,
        role: RoleType.USER,
      };
      const accessToken = await this.createAccessToken(
        createTokenPayload,
        UserType.WITH_FACEBOOK,
      );
      const refreshToken = await this.createRefreshToken(createTokenPayload);
      await this.userModel.findOneAndUpdate(
        { email: user.email },
        {
          $set: { refreshToken: refreshToken.token },
        },
      );
      const dataUser = await this.userModel.findOne({ email: user.email });
      const response = {
        accessToken,
        refreshToken,
        user: dataUser,
      };
      return SuccessResponse.from(response);
    } catch (error) {
      return SuccessResponse.from(null, StatusCode.FOR_BIDDEN, error.messsage);
    }
  }

  async loginWithFacebook(user: CreateUserWithFacebook) {
    const validateUser = await this.validateUserByEmail(user.email);
    let newUser;
    if (!validateUser) {
      return await this.registerWithFacebook(user);
    } else {
      if (!validateUser.provider.includes(UserProvider.FACEBOOK)) {
        const provider: string[] = validateUser.provider;
        provider.push(UserProvider.FACEBOOK);
        newUser = await this.userModel
          .findOneAndUpdate(
            { email: user.email },
            {
              $set: {
                facebookId: user.facebookId,
                birthday: user.birthday,
                gender: user.gender,
                facebookProfileUrl: user.profileUrl,
                provider: provider,
              },
            },
          )
          .exec();
      } else {
        newUser = validateUser;
      }
    }
    const createTokenPayload: CreateTokenDto = {
      email: newUser.email,
      type: TokenType.ACCESS_TOKEN,
      role: RoleType.USER,
    };
    const accessToken = await this.createAccessToken(
      createTokenPayload,
      UserType.WITH_FACEBOOK,
    );
    const refreshToken = await this.createRefreshToken(createTokenPayload);
    await this.userModel.findOneAndUpdate(
      { email: user.email },
      {
        $set: { refreshToken: refreshToken.token },
      },
    );
    const dataUser = await this.userModel.findOne({
      email: user.email,
    });
    const response = {
      accessToken,
      refreshToken,
      user: dataUser,
    };
    return SuccessResponse.from(response);
  }
  //#region
}
