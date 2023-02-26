import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { RoleType } from 'src/constants/role-type';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ _id: true, auto: true })
  id: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true, minlength: 8 })
  @Exclude()
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ default: RoleType.USER })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
