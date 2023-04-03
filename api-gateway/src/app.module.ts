import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './common/constants/jwt.constants';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { RolesGuard } from './common/guards';
import { GoogleStrategy, FacebookStrategy } from './common/strategy/index';
import { JwtStrategy } from './common/strategy/jwt.strategy';
import { ShopController } from './shop/shop.controller';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_MICROSERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'auth',
    //         brokers: ['localhost:9092'],
    //       },
    //       consumer: {
    //         groupId: 'auth-consumer',
    //       },
    //       producerOnlyMode: true,
    //     },
    //   },
    // ]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'client',
                brokers: [
                  configService.get('KAFKA_BROKER') ?? process.env.KAFKA_BROKER,
                ],
              },
              consumer: {
                groupId: `client-consumer`,
              },
            },
          };
        },
      },
    ]),
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '14d',
      },
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ],
  controllers: [AppController, ShopController],
  providers: [
    AppService,
    GoogleStrategy,
    FacebookStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
