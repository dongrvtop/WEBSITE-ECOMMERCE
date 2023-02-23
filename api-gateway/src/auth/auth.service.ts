import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientKafka,
  ) {}

  async createUser() {
    console.log('---> authClient emit create_user');
    return await this.authClient.emit('create_user', {
      email: 'dongnd@gmail.com',
      firstName: 'Đồng',
      lastName: 'Nguyễn Duy',
    });
  }
}
