import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(data: CreateUserDto): Promise<import("rxjs").Observable<any>>;
    login(data: UserLoginDto): Promise<import("rxjs").Observable<any>>;
    refreshAccessToken(userId: string, refreshToken: string): Promise<import("rxjs").Observable<any>>;
    getUser(token: string): Promise<import("rxjs").Observable<any>>;
}
