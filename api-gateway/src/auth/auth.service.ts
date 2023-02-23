import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
    this.authClient.subscribeToResponseOf('create_user');
  }

  onModuleDestroy() {
    this.authClient.close();
  }

  async createUser() {
    console.log('---> authClient emit create_user');
    this.authClient.emit('create_user', {
      email: 'dongnd@gmail.com',
      firstName: 'Đồng',
      lastName: 'Nguyễn Duy',
    });
  }

  async getUser() {
    return this.authClient.send('get_user', {});
  }
}
