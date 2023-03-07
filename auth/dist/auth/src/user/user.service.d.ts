/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UserLoginDto } from './dto/user-login.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { CreateUserWithGoogle } from './dto/create-user-with-google.dto';
import { UserType } from './enum/user-type';
import { CreateUserWithFacebook } from './dto/create-user-with-facebook';
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
    validateUser(data: UserLoginDto): Promise<import("mongoose").Document<unknown, any, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createAccessToken(data: CreateTokenDto, userType?: UserType): Promise<TokenResponseDto>;
    createRefreshToken(data: CreateTokenDto): Promise<TokenResponseDto>;
    refreshAccessToken(data: RefreshAccessTokenDto): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    private validateToken;
    getUser(token: string): Promise<any>;
    registerWithGoogle(user: CreateUserWithGoogle): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    loginWithGoogle(user: CreateUserWithGoogle): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    validateUserByEmail(email: string): Promise<import("mongoose").Document<unknown, any, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    registerWithFacebook(user: CreateUserWithFacebook): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    loginWithFacebook(user: CreateUserWithFacebook): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
}
