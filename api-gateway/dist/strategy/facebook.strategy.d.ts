import { VerifiedCallback } from 'passport-facebook';
declare const FacebookStrategy_base: new (...args: any[]) => any;
export declare class FacebookStrategy extends FacebookStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profileFields: any, done: VerifiedCallback): Promise<any>;
}
export {};
