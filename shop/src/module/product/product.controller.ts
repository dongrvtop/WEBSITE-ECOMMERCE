import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { ShopPattern } from 'src/common/enum/shop.pattern';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { UpdateProductColorDto } from './dto/update-product-color.dto';
import { CreateProductColorDto } from './dto/create-product-color.dto';

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

  @MessagePattern(ShopPattern.DELETE_PRODUCT)
  deleteProductById(@Payload() id: string) {
    return this.productService.deleteProductById(id);
  }

  @MessagePattern(ShopPattern.ADD_PRODUCT_DETAIL)
  addProductDetail(@Payload() data: CreateProductDetailDto[]) {
    return this.productService.addProductDetail(data);
  }

  @MessagePattern(ShopPattern.UPDATE_PRODUCT_DETAIL)
  updateProductDetail(@Payload() data: UpdateProductDetailDto) {
    return this.productService.updateProductDetail(data);
  }

  @MessagePattern(ShopPattern.DELETE_PRODUCT_DETAIL)
  deleteProductDetail(@Payload() id: string | string[]) {
    return this.productService.deleteProductDetail(id);
  }

  @MessagePattern(ShopPattern.ADD_PRODUCT_COLOR)
  addProductColor(@Payload() data: CreateProductColorDto[]) {
    return this.productService.addProductColor(data);
  }

  @MessagePattern(ShopPattern.UPDATE_PRODUCT_COLOR)
  updateProductColor(@Payload() data: UpdateProductColorDto) {
    return this.productService.updateProductColor(data);
  }

  @MessagePattern(ShopPattern.DELETE_PRODUCT_COLOR)
  deleteProductColor(@Payload() id: string | string[]) {
    return this.productService.deleteProductColor(id);
  }

  @MessagePattern(ShopPattern.ALL_PRODUCT)
  getAllProductByShopId(@Payload() id: string) {
    return this.productService.getAllProductByShopId(id);
  }
}
