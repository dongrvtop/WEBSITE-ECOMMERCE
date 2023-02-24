import { ClientKafka } from '@nestjs/microservices';
export declare class AuthService {
    private readonly authClient;
    constructor(authClient: ClientKafka);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
    createUser(): Promise<import("rxjs").Observable<string>>;
    getUser(): Promise<import("rxjs").Observable<any>>;
}
