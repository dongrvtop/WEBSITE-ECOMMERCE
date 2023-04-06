import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Product {
  @Prop({ auto: true })
  id: string;

  @Prop()
  shopId: string;

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

  @Prop()
  color: string;

  @Prop()
  size: string[];
}
