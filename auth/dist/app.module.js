"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("@nestjs/microservices/enums");
const module_1 = require("@nestjs/microservices/module");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            module_1.ClientsModule.register([
                {
                    name: 'AUTH_MICROSERVICE',
                    transport: enums_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'auth',
                            brokers: ['localhost:9092'],
                        },
                        consumer: {
                            groupId: 'auth-consumer',
                        },
                    },
                },
            ]),
            mongoose_1.MongooseModule.forRoot((_a = process.env.MONGODB_URL) !== null && _a !== void 0 ? _a : 'mongodb+srv://wsEcommerce:password_123@ecommerce.0hvhaod.mongodb.net/?retryWrites=true&w=majority'),
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map