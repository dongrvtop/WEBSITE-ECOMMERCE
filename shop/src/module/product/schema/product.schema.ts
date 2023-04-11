import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, {
  Document,
  HydratedDocument,
  ObjectId,
  SchemaTypes,
  Types,
} from 'mongoose';
import { type } from 'os';
import { Shop } from 'src/module/shop/schema/shop.schema';
import { ProductColor, ProductColorSchema } from './product-color.schema';

export type ProductDocument = HydratedDocument<Product>;
@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Product {
  //   @Prop({ auto: true })
  //   id: string;
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductColor' }],
  })
  colors: ProductColor[];

  @Prop()
  size: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// export const ProductSchema = new mongoose.Schema({
//   shopId: { type: mongoose.Schema.Types.ObjectId, ref: Shop.name },
//   categoryId: { type: String },
//   name: { type: String },
//   quantityInStock: { type: Number },
//   price: { type: Number },
//   originalPrice: { type: Number },
//   minPrice: { type: Number },
//   maxPrice: { type: Number },
//   discountPercent: { type: Number },
//   description: { type: String },
//   colors: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'ProductColor',
//       require: false,
//     },
//   ],
//   size: { type: String },
// });

// export interface Product extends mongoose.Document {
//   id: string;
//   shopId: string;
//   categoryId: string;
//   name: string;
//   quantityInStock: number;
//   price: number;
//   originalPrice: number;
//   minPrice: number;
//   maxPrice: number;
//   discountPercent: number;
//   description: string;
//   colors: Array<string>;
//   size: string;
// }
