import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { classToPlain, Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { RoleType } from 'src/constants/role-type';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ auto: true })
  id: string;

  @Prop({ required: false, unique: true })
  userName: string;

  @Prop({ required: false, unique: true })
  email: string;

  @Prop({ required: false, minlength: 8 })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop()
  refreshToken: string;

  @Prop({ default: false })
  isRegisterWithGoogle: boolean;

  @Prop({ default: RoleType.USER })
  role: string;
}

// export const UserSchema = SchemaFactory.createForClass(User);
export const UserSchema = (() => {
  const userSchema = SchemaFactory.createForClass(User);
  userSchema.set('toJSON', {
    transform: function (_, ret) {
      delete ret.refreshToken;
      delete ret.password;
      return ret;
    },
  });
  return userSchema;
})();
