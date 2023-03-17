import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GoogleStrategy, FacebookStrategy } from 'src/common/strategy/index';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_MICROSERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'auth',
    //         brokers: ['KAFKA_HOST:9092'],
    //       },
    //       consumer: {
    //         groupId: 'auth-consumer',
    //       },
    //       // producerOnlyMode: true,
    //     },
    //   },
    //   {
    //     name: 'API-GATEWAY',
    //     transport: Transport.KAFKA,
    //     options: {},
    //   },
    // ]),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_MICROSERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'auth',
                brokers: [
                  configService.get('KAFKA_BROKER') ?? process.env.KAFKA_BROKER,
                  // 'kafka:9092',
                ],
                // ssl: true,
              },
              consumer: {
                groupId: `gateway-consumer`,
              },
            },
          };
        },
      },
      // {
      //   name: 'API-GATEWAY',
      //   useFactory: () => {
      //     return {
      //       transport: Transport.KAFKA,
      //       options: {},
      //     };
      //   },
      // },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy],
})
export class AuthModule {}
