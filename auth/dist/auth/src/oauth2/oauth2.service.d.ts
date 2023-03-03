import { Auth } from 'googleapis';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
export declare class Oauth2Service {
    private readonly userService;
    private readonly userModel;
    oauthGoogleClient: Auth.OAuth2Client;
    constructor(userService: UserService, userModel: Model<UserDocument>);
    authenticate(): Promise<string>;
    registerUserByGoogle(token: string, email: string): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    getUserDataByGoogleToken(token: string): Promise<import("googleapis").oauth2_v2.Schema$Userinfo>;
}
