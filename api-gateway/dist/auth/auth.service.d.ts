import { ClientKafka } from '@nestjs/microservices';
export declare class AuthService {
    private readonly authClient;
    constructor(authClient: ClientKafka);
    onModuleInit(): void;
    onModuleDestroy(): void;
    createUser(): Promise<void>;
    getUser(): Promise<import("rxjs").Observable<any>>;
}
