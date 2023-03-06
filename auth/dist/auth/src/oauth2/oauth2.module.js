"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oauth2Module = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schema/user.schema");
const user_module_1 = require("../user/user.module");
const oauth2_controller_1 = require("./oauth2.controller");
const oauth2_service_1 = require("./oauth2.service");
let Oauth2Module = class Oauth2Module {
};
Oauth2Module = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: configService.get('JWT_EXPIRES_DATE') },
                }),
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
        ],
        controllers: [oauth2_controller_1.Oauth2Controller],
        providers: [oauth2_service_1.Oauth2Service],
        exports: [oauth2_service_1.Oauth2Service],
    })
], Oauth2Module);
exports.Oauth2Module = Oauth2Module;
//# sourceMappingURL=oauth2.module.js.map