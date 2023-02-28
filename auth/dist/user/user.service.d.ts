import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UserLoginDto } from './dto/user-login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private readonly userModel;
    private readonly jwtService;
    private readonly configService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, configService: ConfigService);
    register(data: CreateUserDto): Promise<{
        user: import("mongoose").Document<unknown, any, User> & Omit<User & {
            _id: import("mongoose").Types.ObjectId;
        }, never> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        accessToken: TokenResponseDto;
        refreshToken: TokenResponseDto;
    }>;
    login(data: UserLoginDto): Promise<{
        user: User;
        accessToken: TokenResponseDto;
        refreshToken: TokenResponseDto;
    }>;
    validateUser(data: UserLoginDto): Promise<User>;
    private createAccessToken;
    private createRefreshToken;
    refreshAccessToken(refreshToken: string): Promise<void>;
    private validateToken;
    getUser(token: string): Promise<any>;
}
