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
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_MICROSERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'auth',
    //         brokers: ['kafka:9092'],
    //       },
    //       consumer: {
    //         groupId: 'auth-consumer',
    //       },
    //     },
    //   },
    // ]),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_MICROSERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          console.log('config', configService.get('BROKER_KAFKA'));
          console.log('process', process.env.BROKER_KAFKA);
          console.log('env', process.env.NODE_ENV);
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'auth',
                brokers: [
                  // configService.get('BROKER_KAFKA') ?? process.env.BROKER_KAFKA,
                  'kafka:9092',
                ],
                // ssl: true,
              },
              consumer: {
                groupId: 'auth-consumer',
              },
            },
          };
        },
      },
    ]),
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
