import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(data: CreateUserDto): Promise<{
        user: import("mongoose").Document<unknown, any, import("./schema/user.schema").User> & Omit<import("./schema/user.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        }, never> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        accessToken: import("./dto/token-response.dto").TokenResponseDto;
        refreshToken: import("./dto/token-response.dto").TokenResponseDto;
    }>;
    userLogin(data: UserLoginDto): Promise<{
        user: import("./schema/user.schema").User;
        accessToken: import("./dto/token-response.dto").TokenResponseDto;
        refreshToken: import("./dto/token-response.dto").TokenResponseDto;
    }>;
    getUser(data: any): Promise<any>;
}
