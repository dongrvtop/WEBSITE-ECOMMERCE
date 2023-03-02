import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
export declare class UserService {
    private readonly userModel;
    private readonly jwtService;
    private readonly configService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, configService: ConfigService);
    register(data: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    login(data: UserLoginDto): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    googleLogin(user: any): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    facebookLogin(user: any): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    validateUser(data: UserLoginDto): Promise<User>;
    private createAccessToken;
    private createRefreshToken;
    refreshAccessToken(data: RefreshAccessTokenDto): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    private validateToken;
    getUser(token: string): Promise<any>;
}
