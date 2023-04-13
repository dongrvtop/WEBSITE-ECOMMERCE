import { Prop, Schema } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import mongoose, { ObjectId } from "mongoose";

@Schema({timestamps: {createdAt: true, updatedAt: true}})
export class ProductSize{
    @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  @Transform(({ value }) => value.toString())
  productId: ObjectId;

  @Prop({unique: true, isRequired: true})
  name: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}