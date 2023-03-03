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
exports.Oauth2Controller = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const user_messages_1 = require("../user/enum/user-messages");
const oauth2_service_1 = require("./oauth2.service");
let Oauth2Controller = class Oauth2Controller {
    constructor(oauth2Service) {
        this.oauth2Service = oauth2Service;
    }
    async googleAuthRedirect(token) {
        return this.oauth2Service.authenticate();
    }
};
__decorate([
    (0, microservices_1.MessagePattern)(user_messages_1.UserMessages.OAUTH2_GOOGLE_LOGIN),
    __param(0, (0, microservices_1.Payload)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Oauth2Controller.prototype, "googleAuthRedirect", null);
Oauth2Controller = __decorate([
    (0, common_1.Controller)('oauth2'),
    __metadata("design:paramtypes", [oauth2_service_1.Oauth2Service])
], Oauth2Controller);
exports.Oauth2Controller = Oauth2Controller;
//# sourceMappingURL=oauth2.controller.js.map