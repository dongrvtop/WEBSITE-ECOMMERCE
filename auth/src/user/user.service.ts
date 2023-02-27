import {
  Injectable,
  NotFoundException,
  BadRequestException,
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

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(data: CreateUserDto) {
    const checkUser = await this.userModel
      .findOne({ userName: data.userName })
      .exec();
    if (checkUser) {
      throw new BadRequestException(
        'Username was availble. Please choose another one.',
      );
    }
    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.userModel.create(data);
    // delete user?.password;
    return user;
  }

  async validateUser(data: UserLoginDto) {
    const user: User = await this.userModel
      .findOne({ userName: data.userName })
      .exec();
    if (!user) {
      throw new NotFoundException('Username does not exist.');
    }
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (!checkPassword) {
      throw new BadRequestException('Password is incorrect. Please try again.');
    }
    return user!;
  }

  async createAccessToken(data: CreateTokenDto): Promise<TokenResponseDto> {
    const accessToken = await this.jwtService.signAsync(data, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_ACCESS_TOKEN'),
    });
    return new TokenResponseDto({
      expiresIn: this.configService.get('JWT_EXPIRES_DATE'),
      token: accessToken,
    });
  }

  async createRefreshToken(data: CreateTokenDto): Promise<TokenResponseDto> {
    const refreshToken = await this.jwtService.signAsync(data, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_REFRESH_TOKEN'),
    });
    return new TokenResponseDto({
      expiresIn: this.configService.get('JWT_EXPIRES_DATE'),
      token: refreshToken,
    });
  }

  async refreshAccessToken(refreshToken: string) {}

  private async decodeRefreshToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (e) {}
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
