import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class ProductDetail {
  @Prop({ auto: true })
  id: string;

  @Prop()
  productId: string;

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
}
