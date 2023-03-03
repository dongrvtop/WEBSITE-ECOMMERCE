import { Oauth2Service } from './oauth2.service';
export declare class Oauth2Controller {
    private readonly oauth2Service;
    constructor(oauth2Service: Oauth2Service);
    googleAuthRedirect(token: any): Promise<string>;
}
