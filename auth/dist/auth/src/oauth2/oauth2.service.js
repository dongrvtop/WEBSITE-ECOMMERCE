"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oauth2Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const googleapis_1 = require("googleapis");
const mongoose_2 = require("mongoose");
const user_service_1 = require("../user/user.service");
const helpers_1 = require("../../../common/helpers");
let Oauth2Service = class Oauth2Service {
    constructor(userService, userModel) {
        this.userService = userService;
        this.userModel = userModel;
        const googleClientID = '202494894639-ln5u34p2ir4ca0nnqo202gok7s6v4mln.apps.googleusercontent.com';
        const googleClientSecret = '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';
        const googleRedirectURI = 'localhost:3000/auth/google/callback';
        this.oauthGoogleClient = new googleapis_1.google.auth.OAuth2({
            clientId: googleClientID,
            clientSecret: googleClientSecret,
            redirectUri: googleRedirectURI,
        });
    }
    async authenticate() {
        const scopes = [
            'https://www.googleapis.com/auth/contacts.readonly',
            'https://www.googleapis.com/auth/user.emails.read',
            'profile',
        ];
        const authorizeUrl = await this.oauthGoogleClient.generateAuthUrl({
            access_type: 'offline',
            scope: scopes.join(' '),
        });
        console.log(`URL: ${JSON.stringify(authorizeUrl)}`);
        console.log(`URL: ${authorizeUrl}`);
        return authorizeUrl;
    }
    async registerUserByGoogle(token, email) {
        const userData = await this.getUserDataByGoogleToken(token);
        const name = userData.name;
        const responseRegister = await this.userService.registerWithGoogle(email, name);
        const payloadCreateToken = {
            userId: responseRegister.data.id,
            role: responseRegister.data.role,
        };
        const accessToken = await this.userService.createAccessToken(payloadCreateToken);
        const refreshToken = await this.userService.createRefreshToken(payloadCreateToken);
        return helpers_1.SuccessResponse.from({
            user: responseRegister.data,
            accessToken,
            refreshToken,
        });
    }
    async getUserDataByGoogleToken(token) {
        const userInfoClient = googleapis_1.google.oauth2('v2').userinfo;
        this.oauthGoogleClient.setCredentials({
            access_token: token,
        });
        const userInfoResponse = await userInfoClient.get({
            auth: this.oauthGoogleClient,
        });
        return userInfoResponse.data;
    }
};
Oauth2Service = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mongoose_2.Model])
], Oauth2Service);
exports.Oauth2Service = Oauth2Service;
//# sourceMappingURL=oauth2.service.js.map