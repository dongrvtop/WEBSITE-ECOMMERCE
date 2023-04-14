import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessResponse } from 'src/common/constants/success-response';
import { CreateProductSizeDto } from './dto/create-product-size.dto';
import { UpdateProductSizeDto } from './dto/update-product-size.dto';
import { ProductSize, ProductSizeDocument } from './schema/product-size.schema';

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectModel(ProductSize.name)
    private readonly productSizeModel: Model<ProductSizeDocument>,
  ) {}

  async addProductSize(data: CreateProductSizeDto[]) {
    try {
      // data.forEach(async(item) => {
      await this.productSizeModel.create(data);
      // })
      const response = await this.productSizeModel.find({
        productId: data[0].productId,
      });
      return SuccessResponse.from(response);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }

  async updateProductSize(data: UpdateProductSizeDto) {
    try {
      const productSize = await this.productSizeModel.findById(data.id);
      if (!productSize) {
        throw new RpcException(
          new BadRequestException('This size does not exist or was deleted'),
        );
      }
      await this.productSizeModel.findByIdAndUpdate(data.id);
      const response = await this.productSizeModel.findById(data.id);
      return SuccessResponse.from(response);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }

  async deleteProductSize(id: string | string[]) {
    try {
      if (Array.isArray(id)) {
        id.forEach(async (itemId) => {
          await this.productSizeModel.findByIdAndDelete(itemId);
        });
        return SuccessResponse.from(null);
      }
      const response = await this.productSizeModel.findByIdAndDelete(id);
      return SuccessResponse.from(response);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }
}
