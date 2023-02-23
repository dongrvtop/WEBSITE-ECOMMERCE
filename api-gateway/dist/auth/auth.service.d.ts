import { ClientKafka } from '@nestjs/microservices';
export declare class AuthService {
    private readonly authClient;
    constructor(authClient: ClientKafka);
    createUser(): Promise<import("rxjs").Observable<any>>;
}
