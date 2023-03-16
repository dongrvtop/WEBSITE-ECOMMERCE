import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { jwtConstants } from './common/constants/jwt.constants';
import { RolesGuard } from './common/guards';
import { GoogleStrategy, FacebookStrategy } from './common/strategy/index';
import { JwtStrategy } from './common/strategy/jwt.strategy';

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
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '14d',
      },
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GoogleStrategy,
    FacebookStrategy,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
