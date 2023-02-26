import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';
export declare class AuthService {
    private readonly authClient;
    constructor(authClient: ClientKafka);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
    createUser(data: CreateUserDto): Promise<import("rxjs").Observable<string>>;
    login(data: UserLoginDto): Promise<import("rxjs").Observable<any>>;
    getUser(): Promise<import("rxjs").Observable<any>>;
}
