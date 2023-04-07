import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product, ProductSchema } from './product.schema';

export type ProductDetailDocument = HydratedDocument<ProductDetail>;
@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class ProductDetail {
  @Prop({ auto: true })
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  @Type(() => Product)
  product: Product;

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
