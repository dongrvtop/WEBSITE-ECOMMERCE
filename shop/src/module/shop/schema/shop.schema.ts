import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShopDocument = HydratedDocument<Shop>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Shop {
  @Prop({ auto: true })
  id: string;

  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  description: string;

  @Prop()
  ratingPoint: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
