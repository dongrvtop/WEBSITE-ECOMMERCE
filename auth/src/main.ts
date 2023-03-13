import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('process', process.env.BROKER_KAFKA);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          // brokers: [process.env.BROKER_KAFKA ?? 'localhost:9092'],
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId: 'auth-consumer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
