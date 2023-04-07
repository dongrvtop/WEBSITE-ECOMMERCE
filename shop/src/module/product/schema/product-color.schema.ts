import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';

export type ProductColorDocument = HydratedDocument<ProductColor>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class ProductColor {
  @Prop({ auto: true })
  id: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  // @Type(() => Product)
  @Prop()
  productId: string;

  @Prop()
  name: string;

  @Prop()
  image: string;
}

export const ProductColorSchema = SchemaFactory.createForClass(ProductColor);
