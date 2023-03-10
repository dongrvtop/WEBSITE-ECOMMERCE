import { SuccessResponse } from '../constants/index';
import { CreateUserDto } from './dto/create-user.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(data: CreateUserDto): Promise<SuccessResponse>;
    userLogin(data: UserLoginDto): Promise<SuccessResponse>;
    refreshAccessToken(data: RefreshAccessTokenDto): Promise<SuccessResponse>;
    googleAuthRedirect(user: any): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    facebookAuthRedirect(user: any): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    getUser(data: any): Promise<any>;
}
