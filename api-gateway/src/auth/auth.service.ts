import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';
import { AuthPattern } from './enum/auth-microserivce.pattern';

const AuthPatternList = [
  AuthPattern.USER_REGISTER,
  AuthPattern.USER_LOGIN,
  AuthPattern.GET_USER,
];

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

  async createUser(data: CreateUserDto) {
    return this.authClient.send<string>(AuthPattern.USER_REGISTER, data);
  }

  async login(data: UserLoginDto) {
    return this.authClient.send<any>(AuthPattern.USER_LOGIN, data);
  }

  async getUser(token: string) {
    return this.authClient.send('get_user', { token });
  }
}
