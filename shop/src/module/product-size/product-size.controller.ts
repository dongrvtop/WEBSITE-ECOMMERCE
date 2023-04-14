import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShopPattern } from 'src/common/enum/shop.pattern';
import { CreateProductSizeDto } from './dto/create-product-size.dto';
import { UpdateProductSizeDto } from './dto/update-product-size.dto';
import { ProductSizeService } from './product-size.service';

@Controller('product-size')
export class ProductSizeController {
  constructor(private readonly productSizeService: ProductSizeService) {}

  @MessagePattern(ShopPattern.CREATE_PRODUCT_SIZE)
  addProductSize(@Payload() data: CreateProductSizeDto[]) {
    return this.productSizeService.addProductSize(data);
  }

  @MessagePattern(ShopPattern.UPDATE_PRODUCT_SIZE)
  updateProductSize(@Payload() data: UpdateProductSizeDto) {
    return this.productSizeService.updateProductSize(data);
  }

  @MessagePattern(ShopPattern.DELETE_PRODUCT_SIZE)
  deleteProductSize(@Payload() id: string | string[]) {
    return this.productSizeService.deleteProductSize(id);
  }
}
