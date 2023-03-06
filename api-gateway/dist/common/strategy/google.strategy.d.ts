import { ConfigService } from '@nestjs/config';
import { VerifiedCallback } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly configSerivce;
    constructor(configSerivce: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback): Promise<any>;
}
export {};
