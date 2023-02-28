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
const token_type_1 = require("../constants/token-type");
const role_type_1 = require("../constants/role-type");
let UserService = class UserService {
    constructor(userModel, jwtService, configService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(data) {
        var _a;
        const checkUser = await this.userModel
            .findOne({ userName: data.userName })
            .exec();
        if (checkUser) {
            throw new common_1.BadRequestException('Username was availble. Please choose another one.');
        }
        data.password = await bcrypt.hash(data.password, 10);
        const user = await this.userModel.create(data);
        const createTokenPayload = {
            userId: user.id,
            role: (_a = user.role) !== null && _a !== void 0 ? _a : role_type_1.RoleType.USER,
        };
        const accessToken = await this.createAccessToken(createTokenPayload);
        const refreshToken = await this.createRefreshToken(createTokenPayload);
        user.refreshToken = refreshToken.token;
        await this.userModel.findByIdAndUpdate(user.id, user);
        delete user.password;
        delete user.refreshToken;
        return {
            user,
            accessToken,
            refreshToken,
        };
    }
    async login(data) {
        var _a;
        const user = await this.validateUser(data);
        if (!user) {
            throw new common_1.NotFoundException('Username does not exist.');
        }
        const checkPassword = await bcrypt.compare(data.password, user.password);
        if (!checkPassword) {
            throw new common_1.BadRequestException('Password is incorrect. Please try again.');
        }
        const createTokenPayload = {
            userId: user.id,
            role: (_a = user.role) !== null && _a !== void 0 ? _a : role_type_1.RoleType.USER,
        };
        const accessToken = await this.createAccessToken(createTokenPayload);
        const refreshToken = await this.createRefreshToken(createTokenPayload);
        user.refreshToken = refreshToken.token;
        await this.userModel.findByIdAndUpdate(user.id, user);
        delete user.password;
        delete user.refreshToken;
        return {
            user,
            accessToken,
            refreshToken,
        };
    }
    async validateUser(data) {
        const user = await this.userModel
            .findOne({ userName: data.userName })
            .exec();
        return user;
    }
    async createAccessToken(data) {
        data.type = token_type_1.TokenType.ACCESS_TOKEN;
        const accessToken = await this.jwtService.signAsync(data, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_ACCESS_TOKEN'),
        });
        return new token_response_dto_1.TokenResponseDto({
            expiresIn: this.configService.get('JWT_EXPIRES_ACCESS_TOKEN'),
            token: accessToken,
        });
    }
    async createRefreshToken(data) {
        data.type = token_type_1.TokenType.REFRESH_TOKEN;
        const refreshToken = await this.jwtService.signAsync(data, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_REFRESH_TOKEN'),
        });
        return new token_response_dto_1.TokenResponseDto({
            expiresIn: this.configService.get('JWT_EXPIRES_REFRESH_TOKEN'),
            token: refreshToken,
        });
    }
    async refreshAccessToken(refreshToken) {
        const isRefreshTokenExpired = await this.validateToken(refreshToken);
    }
    async validateToken(token) {
        try {
            await this.jwtService.verifyAsync(token);
            return false;
        }
        catch (e) {
            return true;
        }
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