"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const index_1 = require("../common/strategy/index");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'AUTH_MICROSERVICE',
                    transport: microservices_1.Transport.KAFKA,
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
                {
                    name: 'API-GATEWAY',
                    transport: microservices_1.Transport.KAFKA,
                    options: {},
                },
            ]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, index_1.GoogleStrategy, index_1.FacebookStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map