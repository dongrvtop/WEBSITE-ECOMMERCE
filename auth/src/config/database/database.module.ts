import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
          dbName: configService.get<string>('MONGODB_DBNAME'),
          keepAlive: true,
        };
      },
      connectionName: process.env.CONNECTION_NAME,
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot(
    //   'mongodb+srv://wsEcommerce:password_123@ecommerce.0hvhaod.mongodb.net/?retryWrites=true&w=majority',
    //   {
    //     dbName: 'website-ecommerce',
    //     keepAlive: true,
    //   },
    // ),
  ],
})
export class DatabaseModule {}
