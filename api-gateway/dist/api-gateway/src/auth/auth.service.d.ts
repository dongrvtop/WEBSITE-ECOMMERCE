import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';
import { SuccessResponse } from '../../../common/helpers/index';
export declare class AuthService {
    private readonly authClient;
    constructor(authClient: ClientKafka);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
    createUser(data: CreateUserDto): Promise<import("rxjs").Observable<any>>;
    login(data: UserLoginDto): Promise<import("rxjs").Observable<SuccessResponse>>;
    refreshAccessToken(userId: string, refreshToken: string): Promise<import("rxjs").Observable<any>>;
    getUser(token: string): Promise<import("rxjs").Observable<any>>;
}
