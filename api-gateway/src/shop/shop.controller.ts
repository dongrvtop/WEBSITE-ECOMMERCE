import {
  Controller,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@Controller('shop')
@ApiTags('shop')
export class ShopController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly client: ClientKafka,
  ) {}
  async onModuleInit() {
    this.client.subscribeToResponseOf('123');
    await this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }

  @Post()
  addShop() {
    return this.client.send('123', { a: 'abc' });
  }
}
