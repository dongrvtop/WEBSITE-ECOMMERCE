"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const jwt_constants_1 = require("./common/constants/jwt.constants");
const guards_1 = require("./common/guards");
const index_1 = require("./common/strategy/index");
const jwt_strategy_1 = require("./common/strategy/jwt.strategy");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            jwt_1.JwtModule.register({
                secret: jwt_constants_1.jwtConstants.secret,
                signOptions: {
                    expiresIn: '14d',
                },
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            index_1.GoogleStrategy,
            index_1.FacebookStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.RolesGuard,
            },
            jwt_strategy_1.JwtStrategy,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map