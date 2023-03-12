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
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    return {
                        uri: configService.get('MONGODB_URI'),
                        dbName: configService.get('MONGODB_DBNAME'),
                        keepAlive: true,
                    };
                },
                connectionName: process.env.CONNECTION_NAME,
                inject: [config_1.ConfigService],
            }),
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            module_1.ClientsModule.register([
                {
                    name: 'AUTH_MICROSERVICE',
                    transport: enums_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'auth',
                            brokers: ['kafka:9092'],
                        },
                        consumer: {
                            groupId: 'auth-consumer',
                        },
                    },
                },
            ]),
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map