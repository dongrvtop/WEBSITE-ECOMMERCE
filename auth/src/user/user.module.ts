import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/config/database/database.module';
import { DatabaseProviders } from 'src/config/database/database.provider';
import { User, UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       uri: 'mongodb+srv://wsEcommerce:password_123@ecommerce.0hvhaod.mongodb.net/?retryWrites=true&w=majority',
    //       dbName: 'website-ecommerce',
    //       // uri: configService.get<string>('MONGODB_URI'),
    //       // dbName: configService.get<string>('MONGODB_DBNAME'),
    //       keepAlive: true,
    //     };
    //   },
    //   connectionName: 'AUTH_MICROSERVICE_CONNECTION',
    //   // process.env.CONNECTION_NAME ?? 'AUTH_MICROSERVICE_CONNECTION',
    //   inject: [ConfigService],
    // }),
    // DatabaseModule,
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'AUTH_MICROSERVICE_CONNECTION',
    ),
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
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_DATE') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    // ...UserProviders
  ],
  exports: [UserService],
})
export class UserModule {}
