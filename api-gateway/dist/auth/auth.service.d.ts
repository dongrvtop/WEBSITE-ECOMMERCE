import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';
export declare class AuthService implements OnModuleInit, OnModuleDestroy {
    private readonly authClient;
    constructor(authClient: ClientKafka);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
    createUser(data: CreateUserDto): Promise<import("rxjs").Observable<any>>;
    login(data: UserLoginDto): Promise<import("rxjs").Observable<any>>;
    refreshAccessToken(userId: string, refreshToken: string): Promise<import("rxjs").Observable<any>>;
    googleAuthRedirect(req: any): Promise<import("rxjs").Observable<any>>;
    getUser(token: string): Promise<import("rxjs").Observable<any>>;
}
