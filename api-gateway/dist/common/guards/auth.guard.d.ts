import type { IAuthGuard, Type } from '@nestjs/passport';
export declare function AuthGuard(options?: Partial<{
    public: boolean;
    accessToken: boolean;
}>): Type<IAuthGuard>;
