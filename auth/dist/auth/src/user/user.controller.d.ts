import { SuccessResponse } from '../../../common/helpers';
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
    getUser(data: any): Promise<any>;
}
