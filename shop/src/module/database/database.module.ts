import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './database.provider';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri:
            configService.get<string>('MONGODB_URL') ??
            'mongodb://root:pwroot@localhost:27017/',
          dbName:
            configService.get<string>('MONGODB_DBNAME') ?? 'Shop_Service_DB',
          keepAlive: true,
        };
      },
      connectionName: process.env.CONNECTION_NAME,
      inject: [ConfigService],
    }),
  ],
  // providers: [...databaseProviders],
  // exports: [...databaseProviders],
})
export class DatabaseModule {}
