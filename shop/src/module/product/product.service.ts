import { ForbiddenException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessResponse } from 'src/common/constants/success-response';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ProductColor,
  ProductColorDocument,
} from './schema/product-color.schema';
import {
  ProductDetail,
  ProductDetailDocument,
} from './schema/product-detail.schema';
import { ProductDocument } from './schema/product.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(ProductDetail.name)
    private readonly productDetailModel: Model<ProductDetailDocument>,
    @InjectModel('ProductColor')
    private readonly productColorModel: Model<ProductColorDocument>,
  ) {}

  async addProduct(data: CreateProductDto) {
    try {
      //   const colorIds = productColor.map((color) => {
      //     return color._id;
      //   });
      const { color, ...newProduct } = data;
      const product = await this.productModel.create({
        ...newProduct,
        // color: productColor,
      });
      if (data.color?.length) {
        const dataColor = data.color.map((color) => {
          return { ...color, productId: product._id };
        });
        const productColor = await this.productColorModel.insertMany(dataColor);
      }
      console.log(`CHECK: ${product.id}`);

      const response = await this.productModel
        .find({
          _id: product._id,
        })
        .populate('colors', 'name image');
      return SuccessResponse.from(response);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }

  async getAllProductByShopId(id: string) {
    try {
      const products = await this.productModel.aggregate([
        {
          $match: {
            shopId: new ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'productcolors',
            localField: '_id',
            foreignField: 'productId',
            as: 'color',
          },
        },
        {
          $lookup: {
            from: 'shops',
            localField: 'shopId',
            foreignField: '_id',
            as: 'shop',
          },
        },
      ]);
      return SuccessResponse.from(products);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }
}
