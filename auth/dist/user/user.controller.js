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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const role_type_1 = require("../constants/role-type");
const token_type_1 = require("../constants/token-type");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_login_dto_1 = require("./dto/user-login.dto");
const user_messages_1 = require("./enum/user-messages");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(data) {
        return this.userService.createUser(data);
    }
    async userLogin(data) {
        var _a, _b;
        const user = await this.userService.validateUser(data);
        const accessToken = await this.userService.createAccessToken({
            userId: user.id,
            role: (_a = user.role) !== null && _a !== void 0 ? _a : role_type_1.RoleType.USER,
            type: token_type_1.TokenType.ACCESS_TOKEN,
        });
        const refreshToken = await this.userService.createRefreshToken({
            userId: user.id,
            role: (_b = user.role) !== null && _b !== void 0 ? _b : role_type_1.RoleType.USER,
            type: token_type_1.TokenType.REFRESH_TOKEN,
        });
        return { user, accessToken, refreshToken };
    }
    getUser(data) {
        const { token } = data;
        console.log(`======================${token}`);
        return this.userService.getUser(token);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)(user_messages_1.UserMessages.USER_REGISTER),
    __param(0, (0, microservices_1.Payload)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.MessagePattern)(user_messages_1.UserMessages.USER_LOGIN),
    __param(0, (0, microservices_1.Payload)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userLogin", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_user'),
    __param(0, (0, microservices_1.Payload)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map