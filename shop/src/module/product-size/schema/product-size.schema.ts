import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type ProductSizeDocument = HydratedDocument<ProductSize>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class ProductSize {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  @Transform(({ value }) => value.toString())
  productId: ObjectId;

  @Prop({ unique: true, isRequired: true })
  name: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductSizeSchema = SchemaFactory.createForClass(ProductSize);
