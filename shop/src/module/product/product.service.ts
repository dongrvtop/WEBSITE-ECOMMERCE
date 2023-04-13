import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { CreateProductColorDto } from './dto/create-product-color.dto';
import { UpdateProductColorDto } from './dto/update-product-color.dto';

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

  async updateProductById(data: UpdateProductDto) {
    try {
      const product = await this.productModel.findOne({ _id: data.id });
      if (!product) {
        throw new RpcException(
          new BadRequestException('This product does not exist or was deleted'),
        );
      }
      await product.updateOne(data);
      return await this.productModel.findOne({ _id: data.id });
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }

  async deleteProductById(id: string) {
    try {
      const product = await this.productModel.findOne({ _id: id });
      if (!product) {
        throw new RpcException(
          new BadRequestException('This product does not exist or was deleted'),
        );
      }
      await this.productDetailModel.deleteMany({ productId: id });
      await this.productColorModel.deleteMany({ productId: id });
      const response = await this.productModel.findOneAndDelete({ _id: id });
      return SuccessResponse.from(response);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }

  async addProductColor(data: CreateProductColorDto[]){
    try {
      if(data.length){
        data.forEach(async (item) => {
          await this.productColorModel.create(item);
        });
      }
      const response = await this.productColorModel.find({productId: data[0].productId});
      return SuccessResponse.from(response);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }

  async updateProductColor(data: UpdateProductColorDto){
    try {
      const productColor = await this.productColorModel.findById(data.id);
      if(!productColor){
        throw new RpcException(new BadRequestException('This color does not exist or was deleted'));
      }
      await productColor.updateOne(data);
      const response = await this.productColorModel.findById(data.id);
      return SuccessResponse.from(response);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }

  async deleteProductColor(id: string | string[]){
    try {
      if(Array.isArray(id)){
        id.forEach(async (idItem) => {
          await this.productDetailModel.deleteMany({colorId: idItem});
          await this.productColorModel.findByIdAndDelete(idItem);
        });
        return SuccessResponse.from(null);
      }
      const productColor = await this.productColorModel.findById(id);
      if(!productColor){
        throw new RpcException(new BadRequestException('This color does not exist or was deleted'));
      }
      await this.productDetailModel.deleteMany({colorId: id});
      const response = await this.productColorModel.findOneAndDelete({_id: id});
      return SuccessResponse.from(response);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }

  async addProductDetail(data: CreateProductDetailDto[]) {
    try {
      if (data.length) {
        data.forEach(async (item) => {
          await this.productDetailModel.create(item);
        });
      }
      const response = await this.productDetailModel.find({
        productId: data[0].productId,
      });
      return SuccessResponse.from(response);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }

  async updateProductDetail(data: UpdateProductDetailDto){
    try {
      const productDetail = await this.productDetailModel.findOne({_id: data.id});
      if(!productDetail){
        throw new RpcException(new BadRequestException('This product detail does not exist or was deleted'));
      }
      await this.productDetailModel.findOneAndUpdate({_id: data.id}, data);
      const response = await this.productDetailModel.findById(data.id);
      return SuccessResponse.from(response);
    } catch (error) {
      throw new RpcException(new ForbiddenException(error.message));
    }
  }
  
  async deleteProductDetail(id: string | string[]){
    try {
      if(Array.isArray(id)){
        id.forEach(async (idItem) => {
          await this.productDetailModel.findByIdAndDelete(idItem);
        });
        return SuccessResponse.from(null);
      }
      const productDetail = await this.productDetailModel.findOne({_id: id});
      if(!productDetail){
        throw new RpcException(new BadRequestException('This product detail does not exist or was deleted'));
      }
      const response = await this.productDetailModel.findByIdAndDelete({_id: id});
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
