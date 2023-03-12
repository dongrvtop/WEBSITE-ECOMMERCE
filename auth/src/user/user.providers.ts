import { Mongoose } from 'mongoose';
import { User, UserSchema } from './schema/user.schema';

export const UserProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model(User.name, UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
