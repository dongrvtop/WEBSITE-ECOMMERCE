import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ShopPattern } from 'src/common/enum/shop.pattern';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern(ShopPattern.ADD_PRODUCT)
  addProduct(@Payload() data: CreateProductDto) {
    return this.productService.addProduct(data);
  }

  @MessagePattern(ShopPattern.UPDATE_PRODUCT)
  updateProduct(@Payload() data: UpdateProductDto) {
    return this.productService.updateProductById(data);
  }

  @MessagePattern(ShopPattern.ADD_PRODUCT_DETAIL)
  addProductDetail(@Payload() data: CreateProductDetailDto[]) {
    return this.productService.addProductDetail(data);
  }

  @MessagePattern(ShopPattern.ALL_PRODUCT)
  getAllProductByShopId(@Payload() id: string) {
    return this.productService.getAllProductByShopId(id);
  }
}
