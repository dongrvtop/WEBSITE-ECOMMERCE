import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GoogleStrategy, FacebookStrategy } from './strategy/index';

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
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, FacebookStrategy],
})
export class AppModule {}
