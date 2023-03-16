import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleType } from 'src/constants/role-type';
import { UserProvider } from '../enum/user-provider';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ auto: true })
  id: string;

  @Prop({ required: false, unique: true })
  userName: string;

  @Prop({ required: false, unique: true })
  email: string;

  @Prop({ required: false, unique: true })
  googleId: string;

  @Prop({ required: false, unique: true })
  facebookId: string;

  @Prop({ required: false, minlength: 8 })
  password: string;

  @Prop({ required: false })
  firstName: string;

  @Prop({ required: false })
  lastName: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ required: false })
  gender: string;

  @Prop()
  facebookProfileUrl: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  birthday: Date;

  @Prop()
  refreshToken: string;

  @Prop({ default: RoleType.USER })
  role: string;

  @Prop({ default: [UserProvider.NORMAL] })
  provider: string[];
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
