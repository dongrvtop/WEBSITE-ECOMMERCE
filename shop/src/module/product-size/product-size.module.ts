import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSizeController } from './product-size.controller';
import { ProductSizeService } from './product-size.service';
import { ProductSize, ProductSizeSchema } from './schema/product-size.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: ProductSize.name, schema: ProductSizeSchema }],
      process.env.CONNECTION_NAME,
    ),
  ],
  controllers: [ProductSizeController],
  providers: [ProductSizeService],
})
export class ProductSizeModule {}
