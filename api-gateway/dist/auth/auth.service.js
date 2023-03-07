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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const auth_microserivce_pattern_1 = require("./enum/auth-microserivce.pattern");
const AuthPatternList = [
    auth_microserivce_pattern_1.AuthPattern.USER_REGISTER,
    auth_microserivce_pattern_1.AuthPattern.USER_LOGIN,
    auth_microserivce_pattern_1.AuthPattern.GET_USER,
    auth_microserivce_pattern_1.AuthPattern.REFRESH_ACCESS_TOKEN,
    auth_microserivce_pattern_1.AuthPattern.OAUTH2_GOOGLE_LOGIN,
    auth_microserivce_pattern_1.AuthPattern.OAUTH2_FACEBOOK_LOGIN,
];
let AuthService = class AuthService {
    constructor(authClient) {
        this.authClient = authClient;
    }
    async onModuleInit() {
        AuthPatternList.forEach((key) => {
            this.authClient.subscribeToResponseOf(key);
        });
        await this.authClient.connect();
    }
    onModuleDestroy() {
        this.authClient.close();
    }
    async createUser(data) {
        return this.authClient.send(auth_microserivce_pattern_1.AuthPattern.USER_REGISTER, data);
    }
    async login(data) {
        return this.authClient.send(auth_microserivce_pattern_1.AuthPattern.USER_LOGIN, data);
    }
    async refreshAccessToken(refreshToken) {
        return this.authClient.send(auth_microserivce_pattern_1.AuthPattern.REFRESH_ACCESS_TOKEN, {
            refreshToken,
        });
    }
    async googleLogin() {
    }
    async googleAuthRedirect(user) {
        return this.authClient.send(auth_microserivce_pattern_1.AuthPattern.OAUTH2_GOOGLE_LOGIN, user);
    }
    async facebookAuthRedirect(user) {
        return this.authClient.send(auth_microserivce_pattern_1.AuthPattern.OAUTH2_FACEBOOK_LOGIN, user);
    }
    async getUser(token) {
        return this.authClient.send('get_user', { token });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_MICROSERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientKafka])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map