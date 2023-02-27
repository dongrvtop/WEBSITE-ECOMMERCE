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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const token_response_dto_1 = require("./dto/token-response.dto");
const dist_1 = require("@nestjs/jwt/dist");
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    constructor(userModel, jwtService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async createUser(data) {
        const checkUser = await this.userModel
            .findOne({ userName: data.userName })
            .exec();
        if (checkUser) {
            throw new common_1.BadRequestException('Username was availble. Please choose another one.');
        }
        data.password = await bcrypt.hash(data.password, 10);
        const user = await this.userModel.create(data);
        return user;
    }
    async validateUser(data) {
        const user = await this.userModel
            .findOne({ userName: data.userName })
            .exec();
        if (!user) {
            throw new common_1.NotFoundException('Username does not exist.');
        }
        const checkPassword = await bcrypt.compare(data.password, user.password);
        if (!checkPassword) {
            throw new common_1.BadRequestException('Password is incorrect. Please try again.');
        }
        return user;
    }
    async createAccessToken(data) {
        const accessToken = await this.jwtService.signAsync(data, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_ACCESS_TOKEN'),
        });
        return new token_response_dto_1.TokenResponseDto({
            expiresIn: this.configService.get('JWT_EXPIRES_DATE'),
            token: accessToken,
        });
    }
    async createRefreshToken(data) {
        const refreshToken = await this.jwtService.signAsync(data, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_REFRESH_TOKEN'),
        });
        return new token_response_dto_1.TokenResponseDto({
            expiresIn: this.configService.get('JWT_EXPIRES_DATE'),
            token: refreshToken,
        });
    }
    async refreshAccessToken(refreshToken) { }
    async decodeRefreshToken(token) {
        try {
            return await this.jwtService.verifyAsync(token);
        }
        catch (e) { }
    }
    async getUser(token) {
        try {
            const res = await this.jwtService.verifyAsync(token);
            return res;
        }
        catch (error) {
            return 'Token expired';
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        dist_1.JwtService,
        config_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map