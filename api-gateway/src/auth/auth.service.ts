import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthPattern } from './enum/auth-microserivce.pattern';

const AuthPatternList = [AuthPattern.CREATE_USER, AuthPattern.GET_USER];

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    AuthPatternList.forEach((key) => {
      this.authClient.subscribeToResponseOf(key);
    });
    await this.authClient.connect();
  }

  onModuleDestroy() {
    this.authClient.close();
  }

  async createUser() {
    console.log('---> authClient emit create_user');
    return this.authClient.send<string>('create_user', {
      email: 'dongnd@gmail.com',
      firstName: 'Đồng',
      lastName: 'Nguyễn Duy',
    });
  }

  async getUser() {
    return this.authClient.send('get_user', {});
  }
}
