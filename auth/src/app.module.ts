import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices/module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: 'mongodb+srv://wsEcommerce:password_123@ecommerce.0hvhaod.mongodb.net/?retryWrites=true&w=majority',
          dbName: 'website-ecommerce',
          // uri: configService.get<string>('MONGODB_URI'),
          // dbName: configService.get<string>('MONGODB_DBNAME'),
          keepAlive: true,
        };
      },
      connectionName: 'AUTH_MICROSERVICE_CONNECTION',
      // process.env.CONNECTION_NAME ?? 'AUTH_MICROSERVICE_CONNECTION',
      inject: [ConfigService],
    }),
    // DatabaseModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    // ClientsModule.registerAsync([
    //   {
    //     name: 'AUTH_MICROSERVICE',
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     useFactory: (configService: ConfigService) => {
    //       return {
    //         transport: Transport.KAFKA,
    //         options: {
    //           client: {
    //             clientId: 'auth',
    //             brokers: [
    //               // configService.get('KAFKA_BROKER') ?? process.env.KAFKA_BROKER,
    //               'kafka:9092',
    //             ],
    //             // ssl: true,
    //           },
    //           consumer: {
    //             groupId: 'auth-consumer',
    //           },
    //         },
    //       };
    //     },
    //   },
    // ]),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
