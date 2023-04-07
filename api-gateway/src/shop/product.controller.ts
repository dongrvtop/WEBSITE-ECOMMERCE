import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { catchError, throwError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { ShopPattern } from './enum/shop-microservice.pattern';

const shopPatternList = [ShopPattern.ADD_PRODUCT, ShopPattern.ALL_PRODUCT];
@Controller('product')
@ApiTags('shop-microservice')
export class ProductController {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}
  async onModuleInit() {
    shopPatternList.forEach((pattern) => {
      this.client.subscribeToResponseOf(pattern);
    });
    await this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }
  @Post('')
  addShop(@Body() data: CreateProductDto) {
    return this.client
      .send(ShopPattern.ADD_PRODUCT, data)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  @Get(':shopId')
  getAllProductByShopId(@Param('shopId') id: string) {
    return this.client
      .send(ShopPattern.ALL_PRODUCT, id)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }
}
