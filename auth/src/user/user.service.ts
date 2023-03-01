import {
  Injectable
} from '@nestjs/common';
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
import { SuccessResponse, StatusCode } from '../../../common/helpers/index';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';

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
      return SuccessResponse.from(null, StatusCode.BAD_REQUEST, 'Username was availble. Please choose another one.');
    }
    data.password = await bcrypt.hash(data.password, 10);
    let user = await this.userModel.create(data);
    const createTokenPayload: CreateTokenDto = {
      userId: user.id,
      role: (user.role as RoleType) ?? RoleType.USER,
    }
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

  async login(data: UserLoginDto){
    const user = await this.validateUser(data);
    if (!user) {
      return SuccessResponse.from(null, StatusCode.BAD_REQUEST, 'Username does not exist.');
    }
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (!checkPassword) {
      return SuccessResponse.from(null, StatusCode.BAD_REQUEST, 'Password is incorrect. Please try again.');
    }
    const createTokenPayload: CreateTokenDto = {
      userId: user.id,
      role: (user.role as RoleType) ?? RoleType.USER,
    }
    const accessToken = await this.createAccessToken(createTokenPayload);
    const refreshToken = await this.createRefreshToken(createTokenPayload);
    // user.refreshToken = refreshToken.token;
    await this.userModel.findByIdAndUpdate(user.id,  {refreshToken: refreshToken.token}).exec();
    delete user.password;
    const response = {
      user,
      accessToken,
      refreshToken,
    };
    return SuccessResponse.from(response);
  }

  async validateUser(data: UserLoginDto) {
    const user: User = await this.userModel
      .findOne({ userName: data.userName })
      .exec();
    if(user){
      return user;
    }
    return null;
  }

  private async createAccessToken(data: CreateTokenDto) {
    data.type = TokenType.ACCESS_TOKEN;
    const accessToken = await this.jwtService.signAsync(data, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_ACCESS_TOKEN'),
    });
    return new TokenResponseDto({
      expiresIn: this.configService.get('JWT_EXPIRES_ACCESS_TOKEN'),
      token: accessToken,
    });
  }

  private async createRefreshToken(data: CreateTokenDto) {
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
    const isRefreshTokenExpired = !await this.validateToken(data.refreshToken);
    if(isRefreshTokenExpired){
      return SuccessResponse.from(null, StatusCode.BAD_REQUEST, 'Refresh token has expired');
    }
    const user = await this.userModel.findById(data.userId).exec();
    if(data.refreshToken !== user.refreshToken){
      return SuccessResponse.from(null, StatusCode.BAD_REQUEST, 'Refresh token incorrect');
    }
    const createAccessTokenPayload: CreateTokenDto = {
      userId: user.id,
      role: (user.role as RoleType) ?? RoleType.USER,
    };
    const accessToken = await this.createAccessToken(createAccessTokenPayload);
    const response = {
      user,
      accessToken,
    }
    return SuccessResponse.from(response);
  }

  private async validateToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (e) {
      return false;
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
}
