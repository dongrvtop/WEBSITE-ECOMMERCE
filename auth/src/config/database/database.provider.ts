import * as mongoose from 'mongoose';

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://wsEcommerce:password_123@ecommerce.0hvhaod.mongodb.net/?retryWrites=true&w=majority',
        {
          dbName: 'website-ecommerce',
          keepAlive: true,
        },
      ),
  },
];
