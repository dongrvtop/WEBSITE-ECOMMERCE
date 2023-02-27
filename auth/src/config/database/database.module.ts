import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot(
            process.env.MONGODB_URL ?? 'mongodb+srv://wsEcommerce:password_123@ecommerce.0hvhaod.mongodb.net/?retryWrites=true&w=majority',
            {dbName: 'website-ecommerce'}
        ),
    ]
})
export class DatabaseModule { }