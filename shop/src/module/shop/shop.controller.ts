import {
  BadRequestException,
  Controller,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { SuccessResponse } from 'src/common/constants/success-response';
import { ShopPattern } from 'src/common/enum/shop.pattern';
import { CatchExceptionInterceptor } from 'src/common/interceptors/catch-exception.interceptor';
import { CreateShopDto } from './dto/create-shop.dto';
import { EditShopDto } from './dto/edit-shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}
  @MessagePattern(ShopPattern.CREATE_SHOP)
  addShop(@Payload() data: CreateShopDto) {
    return this.shopService.addShop(data);
  }

  @MessagePattern(ShopPattern.EDIT_SHOP)
  editShop(@Payload() data: EditShopDto) {
    return this.shopService.editShop(data);
  }
}
