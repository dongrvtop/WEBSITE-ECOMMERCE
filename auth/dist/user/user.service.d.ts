import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    constructor();
    createUser(data: CreateUserDto): string;
    getUser(): {
        email: string;
        firstName: string;
        lastName: string;
    };
}
