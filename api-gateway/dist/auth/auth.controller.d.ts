import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(): Promise<void>;
    getUser(): Promise<import("rxjs").Observable<any>>;
}
