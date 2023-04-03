import mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        process.env.MONGODB_URL ?? 'mongodb://root:pwroot@localhost:27017/',
        {
          keepAlive: true,
          dbName: 'Shop_Service_DB',
        },
      ),
  },
];
