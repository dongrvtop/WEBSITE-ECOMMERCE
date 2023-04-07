import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ShopPattern } from 'src/common/enum/shop.pattern';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern(ShopPattern.ADD_PRODUCT)
  addProduct(@Payload() data: CreateProductDto) {
    return this.productService.addProduct(data);
  }

  @MessagePattern(ShopPattern.ALL_PRODUCT)
  getAllProductByShopId(@Payload() id: string) {
    return this.productService.getAllProductByShopId(id);
  }
}
