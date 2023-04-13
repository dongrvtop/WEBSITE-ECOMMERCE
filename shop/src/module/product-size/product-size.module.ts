import { Module } from '@nestjs/common';
import { ProductSizeController } from './product-size.controller';
import { ProductSizeService } from './product-size.service';

@Module({
  controllers: [ProductSizeController],
  providers: [ProductSizeService]
})
export class ProductSizeModule {}
