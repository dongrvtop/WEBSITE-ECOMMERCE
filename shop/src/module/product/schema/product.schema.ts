import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { type } from 'os';
import { Shop } from 'src/module/shop/schema/shop.schema';
import { ProductColor } from './product-color.schema';

export type ProductDocument = HydratedDocument<Product>;
@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Product {
  @Prop({ auto: true })
  id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Shop.name })
  @Type(() => Shop)
  shopId: Shop;

  @Prop()
  categoryId: string;

  @Prop()
  name: string;

  @Prop()
  quantityInStock: number;

  @Prop()
  price: number;

  @Prop()
  originalPrice: number;

  @Prop()
  minPrice: number;

  @Prop()
  maxPrice: number;

  @Prop()
  discountPercent: number;

  @Prop()
  description: string;

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProductColor.name })
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ProductColor.name }],
  })
  @Type(() => Array<ProductColor>)
  color: ProductColor[];

  @Prop()
  size: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
