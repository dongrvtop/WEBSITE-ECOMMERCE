import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Post,
  Put,
  Type,
} from '@nestjs/common';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { catchError, throwError } from 'rxjs';
import { CreateShopDto } from './dto/create-shop.dto';
import { EditShopDto } from './dto/edit-shop.dto';
import { ShopPattern } from './enum/shop-microservice.pattern';

const shopPatternList = [ShopPattern.CREATE_SHOP, ShopPattern.EDIT_SHOP];

@Controller('shop')
@ApiTags('shop')
export class ShopController implements OnModuleInit, OnModuleDestroy {
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

  @Post()
  addShop(@Body() data: CreateShopDto) {
    return this.client
      .send(ShopPattern.CREATE_SHOP, data)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  @Put('/:id')
  editShop(@Param('id') id: string, @Body() data: EditShopDto) {
    return this.client
      .send(ShopPattern.EDIT_SHOP, { id, ...data })
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }
}
