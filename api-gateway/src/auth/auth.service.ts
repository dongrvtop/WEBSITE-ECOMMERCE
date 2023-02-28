import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';
import { AuthPattern } from './enum/auth-microserivce.pattern';
import { SuccessResponse } from '../../../common/helpers/index';

const AuthPatternList = [
  AuthPattern.USER_REGISTER,
  AuthPattern.USER_LOGIN,
  AuthPattern.GET_USER,
  AuthPattern.REFRESH_ACCESS_TOKEN,
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
    return this.authClient.send(AuthPattern.USER_REGISTER, data);
  }

  async login(data: UserLoginDto) {
    return this.authClient.send<SuccessResponse>(AuthPattern.USER_LOGIN, data);
  }

  async refreshAccessToken(userId: string, refreshToken: string){
    return this.authClient.send(AuthPattern.REFRESH_ACCESS_TOKEN, {userId, refreshToken});
  }

  async getUser(token: string) {
    return this.authClient.send('get_user', { token });
  }
}
