import { Auth } from 'googleapis';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
export declare class Oauth2Service {
    private readonly userService;
    private readonly configService;
    private readonly userModel;
    oauthGoogleClient: Auth.OAuth2Client;
    constructor(userService: UserService, configService: ConfigService, userModel: Model<UserDocument>);
    authenticate(accessToken: string): Promise<string>;
}
