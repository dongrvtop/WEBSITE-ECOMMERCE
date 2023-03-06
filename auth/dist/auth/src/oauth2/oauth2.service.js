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
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
let Oauth2Service = class Oauth2Service {
    constructor(userService, configService, userModel) {
        this.userService = userService;
        this.configService = configService;
        this.userModel = userModel;
        this.oauthGoogleClient = new googleapis_1.google.auth.OAuth2({
            clientId: configService.get('googleClientID'),
            clientSecret: configService.get('googleClientSecret'),
            redirectUri: configService.get('googleRedirectURI'),
        });
    }
    async authenticate(accessToken) {
        const scopes = [
            'https://www.googleapis.com/auth/contacts.readonly',
            'https://www.googleapis.com/auth/user.emails.read',
            'profile',
        ];
        const authorizeUrl = await this.oauthGoogleClient.generateAuthUrl({
            access_type: 'offline',
            scope: scopes.join(' '),
        });
        console.log(`URL: ${authorizeUrl}`);
        return authorizeUrl;
    }
};
Oauth2Service = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService,
        mongoose_2.Model])
], Oauth2Service);
exports.Oauth2Service = Oauth2Service;
//# sourceMappingURL=oauth2.service.js.map