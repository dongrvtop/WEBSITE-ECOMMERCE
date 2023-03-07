import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(data: CreateUserDto): Promise<import("rxjs").Observable<any>>;
    login(data: UserLoginDto): Promise<import("rxjs").Observable<any>>;
    refreshAccessToken(refreshToken: string): Promise<import("rxjs").Observable<any>>;
    googleLogin(res: Response): void | Promise<void>;
    googleAuthRedirect(req: any): Promise<import("rxjs").Observable<any>>;
    facebookLogin(): string;
    facebookAuthRedirect(req: any): Promise<import("rxjs").Observable<any>>;
    getProfile(req: any): any;
    getUser(token: string): Promise<import("rxjs").Observable<any>>;
}
