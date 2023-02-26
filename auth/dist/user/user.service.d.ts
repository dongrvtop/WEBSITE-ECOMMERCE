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
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private readonly userModel;
    private readonly jwtService;
    private readonly configService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, configService: ConfigService);
    createUser(data: CreateUserDto): Promise<import("mongoose").Document<unknown, any, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    validateUser(data: UserLoginDto): Promise<import("mongoose").Document<unknown, any, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    createAccessToken(data: CreateAccessTokenDto): Promise<TokenResponseDto>;
    getUser(): Promise<User[]>;
}
