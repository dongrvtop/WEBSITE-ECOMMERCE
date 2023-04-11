import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {
  ProductColor,
  ProductColorSchema,
} from './schema/product-color.schema';
import {
  ProductDetail,
  ProductDetailSchema,
} from './schema/product-detail.schema';
import { Product, ProductSchema } from './schema/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Product', schema: ProductSchema },
        { name: ProductDetail.name, schema: ProductDetailSchema },
        { name: 'ProductColor', schema: ProductColorSchema },
      ],
      process.env.CONNECTION_NAME,
    ),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
