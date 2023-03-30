import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/database.module';
import { Shop, ShopSchema } from './schema/shop.schema';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Shop.name, schema: ShopSchema }],
      process.env.CONNECTION_NAME,
    ),
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
