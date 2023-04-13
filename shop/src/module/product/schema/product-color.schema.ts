import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Product } from './product.schema';

export type ProductColorDocument = HydratedDocument<ProductColor>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class ProductColor {
  // @Prop({ auto: true })
  // id: string;
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  @Transform(({ value }) => value.toString())
  // @Type(() => Product)
  // @Prop()
  productId: ObjectId;
  @Prop()
  name: string;

  @Prop()
  image: string;
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductColorSchema = SchemaFactory.createForClass(ProductColor);

// export const ProductColorSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     require: false,
//   },
//   name: { type: String },
//   image: { type: String },
// });

// export interface ProductColor extends mongoose.Document {
//   id: string;
//   productId: string;
//   image: string;
// }
