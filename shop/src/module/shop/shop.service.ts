import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessResponse } from 'src/common/constants/success-response';
import { CreateShopDto } from './dto/create-shop.dto';
import { EditShopDto } from './dto/edit-shop.dto';
import { Shop, ShopDocument } from './schema/shop.schema';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop.name)
    private readonly shopModel: Model<ShopDocument>,
  ) {}
  async addShop(data: CreateShopDto) {
    const checkAvailable = await this.checkExistShopByUserId(data.userId);
    if (checkAvailable) {
      throw new RpcException(new NotAcceptableException('You have had shop'));
    }
    const shop = await this.shopModel.create(data);
    return SuccessResponse.from(shop);
  }

  async editShop(data: EditShopDto) {
    const checkShopAvailable = await this.checkExistShopById(data.id);
    if (!checkShopAvailable) {
      throw new RpcException(new BadRequestException("You don't have shop"));
    }
    await this.shopModel.findOneAndUpdate({ _id: data.id }, data);
    const shop = await this.shopModel.findOne({ _id: data.id });
    return SuccessResponse.from(shop);
  }

  private async checkExistShopByUserId(userId: string) {
    const shop = await this.shopModel.findOne({ userId: userId });
    return shop ? true : false;
  }

  private async checkExistShopById(id: string) {
    const shop = await this.shopModel.findOne({ _id: id });
    return shop ? true : false;
  }
}
