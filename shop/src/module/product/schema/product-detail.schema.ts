import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Product, ProductSchema } from './product.schema';

export type ProductDetailDocument = HydratedDocument<ProductDetail>;
@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class ProductDetail {
  // @Prop({ auto: true })
  // id: string;
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  // @Type(() => Product)
  // product: Product;

  @Prop()
  colorId: string;

  @Prop()
  sizeId: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  originalPrice: number;

  @Prop()
  images: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductDetailSchema = SchemaFactory.createForClass(ProductDetail);