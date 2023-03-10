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
const index_1 = require("../constants/index");
const user_type_1 = require("./enum/user-type");
const user_provider_1 = require("./enum/user-provider");
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
            return index_1.SuccessResponse.from(null, index_1.StatusCode.BAD_REQUEST, 'Username was availble. Please choose another one.');
        }
        data.password = await bcrypt.hash(data.password, 10);
        await this.userModel.create(data);
        let user = await this.userModel.findOne({ userName: data.userName }).exec();
        const createTokenPayload = {
            userId: user._id.toString(),
            role: (_a = user.role) !== null && _a !== void 0 ? _a : role_type_1.RoleType.USER,
        };
        const accessToken = await this.createAccessToken(createTokenPayload);
        const refreshToken = await this.createRefreshToken(createTokenPayload);
        await this.userModel.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken.token,
        });
        delete user.password;
        delete user.refreshToken;
        const response = {
            user,
            accessToken,
            refreshToken,
        };
        return index_1.SuccessResponse.from(response);
    }
    async login(data) {
        var _a;
        const user = await this.validateUser(data);
        if (!user) {
            return index_1.SuccessResponse.from(null, index_1.StatusCode.BAD_REQUEST, 'Username does not exist.');
        }
        const checkPassword = await bcrypt.compare(data.password, user.password);
        if (!checkPassword) {
            return index_1.SuccessResponse.from(null, index_1.StatusCode.BAD_REQUEST, 'Password is incorrect. Please try again.');
        }
        const createTokenPayload = {
            userId: user._id.toString(),
            role: (_a = user.role) !== null && _a !== void 0 ? _a : role_type_1.RoleType.USER,
        };
        const accessToken = await this.createAccessToken(createTokenPayload);
        const refreshToken = await this.createRefreshToken(createTokenPayload);
        await this.userModel
            .findByIdAndUpdate(user._id, { refreshToken: refreshToken.token })
            .exec();
        delete user.password;
        const response = {
            user,
            accessToken,
            refreshToken,
        };
        return index_1.SuccessResponse.from(response);
    }
    async googleLogin(user) {
        if (!user) {
            return index_1.SuccessResponse.from(null, index_1.StatusCode.BAD_REQUEST, 'No user from gooogle');
        }
        return index_1.SuccessResponse.from(user);
    }
    async facebookLogin(user) {
        if (!user) {
            return index_1.SuccessResponse.from(null, index_1.StatusCode.BAD_REQUEST, 'No user from facebook');
        }
        return index_1.SuccessResponse.from(user);
    }
    async validateUser(data) {
        const user = await this.userModel
            .findOne({ userName: data.userName })
            .exec();
        if (user) {
            return user;
        }
        return null;
    }
    async createAccessToken(data, userType = user_type_1.UserType.WITH_NORMAL) {
        data.type = token_type_1.TokenType.ACCESS_TOKEN;
        let expiresIn;
        switch (userType) {
            case user_type_1.UserType.WITH_GOOGLE:
                expiresIn = await this.configService.get('JWT_GOOGLE_EXPIRES_ACCESS_TOKEN');
                break;
            default:
                expiresIn = await this.configService.get('JWT_EXPIRES_ACCESS_TOKEN');
                break;
        }
        const accessToken = await this.jwtService.signAsync(data, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn,
        });
        return new token_response_dto_1.TokenResponseDto({
            expiresIn,
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
    async refreshAccessToken(data) {
        var _a, _b;
        try {
            const tokenInfo = await this.validateToken(data.refreshToken);
            if (!tokenInfo) {
                return index_1.SuccessResponse.from(null, index_1.StatusCode.BAD_REQUEST, 'Refresh token has expired');
            }
            const user = await this.userModel.findById(tokenInfo.userId).exec();
            console.log('data', data.refreshToken);
            console.log('user', user.refreshToken);
            if (data.refreshToken !== user.refreshToken) {
                return index_1.SuccessResponse.from(null, index_1.StatusCode.BAD_REQUEST, 'Refresh token incorrect');
            }
            const createAccessTokenPayload = {
                userId: user._id.toString(),
                role: (_a = user.role) !== null && _a !== void 0 ? _a : role_type_1.RoleType.USER,
                email: (_b = user.email) !== null && _b !== void 0 ? _b : null,
            };
            const accessToken = await this.createAccessToken(createAccessTokenPayload);
            const response = {
                user,
                accessToken,
            };
            return index_1.SuccessResponse.from(response);
        }
        catch (error) {
            return index_1.SuccessResponse.from(null, index_1.StatusCode.FOR_BIDDEN, error.message);
        }
    }
    async validateToken(token) {
        try {
            const tokenInfo = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            return tokenInfo;
        }
        catch (e) {
            return null;
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
    async registerWithGoogle(user) {
        try {
            const newUser = await this.userModel.create({
                email: user.email,
                googleId: user.googleId,
                firstName: user.firstName,
                lastName: user.lastName,
                role: role_type_1.RoleType.USER,
                avatarUrl: user.avatarUrl,
                provider: [user_provider_1.UserProvider.GOOGLE],
            });
            console.log(newUser._id.toString());
            const createTokenPayload = {
                email: newUser.email,
                type: token_type_1.TokenType.ACCESS_TOKEN,
                role: role_type_1.RoleType.USER,
                userId: newUser._id.toString(),
            };
            const accessToken = await this.createAccessToken(createTokenPayload, user_type_1.UserType.WITH_GOOGLE);
            const refreshToken = await this.createRefreshToken(createTokenPayload);
            await this.userModel.findOneAndUpdate({ email: user.email }, {
                $set: { refreshToken: refreshToken.token },
            });
            const dataUser = await this.userModel.findOne({ email: user.email });
            const response = {
                accessToken,
                refreshToken,
                user: dataUser,
            };
            return index_1.SuccessResponse.from(response);
        }
        catch (error) {
            return index_1.SuccessResponse.from(null, index_1.StatusCode.FOR_BIDDEN, error.message);
        }
    }
    async loginWithGoogle(user) {
        try {
            const validateUser = await this.validateUserByEmail(user.email);
            let newUser;
            if (!validateUser) {
                return await this.registerWithGoogle(user);
            }
            else {
                if (!validateUser.provider.includes(user_provider_1.UserProvider.GOOGLE)) {
                    const provider = validateUser.provider;
                    provider.push(user_provider_1.UserProvider.GOOGLE);
                    newUser = await this.userModel
                        .findOneAndUpdate({ email: user.email }, {
                        $set: {
                            googleId: user.googleId,
                            provider: provider,
                        },
                    })
                        .exec();
                }
                else {
                    newUser = validateUser;
                }
            }
            const createTokenPayload = {
                email: newUser.email,
                type: token_type_1.TokenType.ACCESS_TOKEN,
                role: role_type_1.RoleType.USER,
                userId: newUser._id.toString(),
            };
            const accessToken = await this.createAccessToken(createTokenPayload, user_type_1.UserType.WITH_GOOGLE);
            const refreshToken = await this.createRefreshToken(createTokenPayload);
            await this.userModel.findOneAndUpdate({ email: user.email }, {
                $set: { refreshToken: refreshToken.token },
            });
            const dataUser = await this.userModel
                .findOne({
                email: user.email,
            })
                .exec();
            const response = {
                accessToken,
                refreshToken,
                user: dataUser,
            };
            return index_1.SuccessResponse.from(response);
        }
        catch (error) {
            return index_1.SuccessResponse.from(null, index_1.StatusCode.FOR_BIDDEN, error.message);
        }
    }
    async validateUserByEmail(email) {
        const user = await this.userModel
            .findOne({
            email,
        })
            .exec();
        if (!user || !email) {
            return null;
        }
        return user;
    }
    async registerWithFacebook(user) {
        try {
            const newUser = await this.userModel.create({
                email: user.email,
                facebookId: user.facebookId,
                firstName: user.name.substring(user.name.lastIndexOf(' ') + 1),
                lastName: user.name.substring(user.name.lastIndexOf(' '), -1),
                role: role_type_1.RoleType.USER,
                avatarUrl: user.avatarUrl,
                birthday: user.birthday,
                provider: user_provider_1.UserProvider.FACEBOOK,
            });
            const createTokenPayload = {
                email: newUser.email,
                type: token_type_1.TokenType.ACCESS_TOKEN,
                role: role_type_1.RoleType.USER,
            };
            const accessToken = await this.createAccessToken(createTokenPayload, user_type_1.UserType.WITH_FACEBOOK);
            const refreshToken = await this.createRefreshToken(createTokenPayload);
            await this.userModel.findOneAndUpdate({ email: user.email }, {
                $set: { refreshToken: refreshToken.token },
            });
            const dataUser = await this.userModel.findOne({ email: user.email });
            const response = {
                accessToken,
                refreshToken,
                user: dataUser,
            };
            return index_1.SuccessResponse.from(response);
        }
        catch (error) {
            return index_1.SuccessResponse.from(null, index_1.StatusCode.FOR_BIDDEN, error.messsage);
        }
    }
    async loginWithFacebook(user) {
        const validateUser = await this.validateUserByEmail(user.email);
        let newUser;
        if (!validateUser) {
            return await this.registerWithFacebook(user);
        }
        else {
            if (!validateUser.provider.includes(user_provider_1.UserProvider.FACEBOOK)) {
                const provider = validateUser.provider;
                provider.push(user_provider_1.UserProvider.FACEBOOK);
                newUser = await this.userModel
                    .findOneAndUpdate({ email: user.email }, {
                    $set: {
                        facebookId: user.facebookId,
                        birthday: user.birthday,
                        gender: user.gender,
                        facebookProfileUrl: user.profileUrl,
                        provider: provider,
                    },
                })
                    .exec();
            }
            else {
                newUser = validateUser;
            }
        }
        const createTokenPayload = {
            email: newUser.email,
            type: token_type_1.TokenType.ACCESS_TOKEN,
            role: role_type_1.RoleType.USER,
        };
        const accessToken = await this.createAccessToken(createTokenPayload, user_type_1.UserType.WITH_FACEBOOK);
        const refreshToken = await this.createRefreshToken(createTokenPayload);
        await this.userModel.findOneAndUpdate({ email: user.email }, {
            $set: { refreshToken: refreshToken.token },
        });
        const dataUser = await this.userModel.findOne({
            email: user.email,
        });
        const response = {
            accessToken,
            refreshToken,
            user: dataUser,
        };
        return index_1.SuccessResponse.from(response);
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