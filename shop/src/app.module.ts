import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './module/database/database.module';
import { databaseProviders } from './module/database/database.provider';
import { ProductModule } from './module/product/product.module';
import { ShopModule } from './module/shop/shop.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '/.env' }),
    DatabaseModule,
    ShopModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...databaseProviders,
    // {
    //   provide: APP_FILTER,
    //   useClass: GlobalExceptionFilter,
    // },
  ],
})
export class AppModule {}
