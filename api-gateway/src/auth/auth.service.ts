import {
  Inject,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';
import { AuthPattern } from './enum/auth-microserivce.pattern';

const AuthPatternList = [
  AuthPattern.USER_REGISTER,
  AuthPattern.USER_LOGIN,
  AuthPattern.GET_USER,
  AuthPattern.REFRESH_ACCESS_TOKEN,
  AuthPattern.OAUTH2_GOOGLE_LOGIN,
  AuthPattern.OAUTH2_FACEBOOK_LOGIN,
];

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
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
    return this.authClient.send(AuthPattern.USER_LOGIN, data);
  }

  async refreshAccessToken(userId: string, refreshToken: string) {
    return this.authClient.send(AuthPattern.REFRESH_ACCESS_TOKEN, {
      userId,
      refreshToken,
    });
  }

  async googleLogin() {
    // return this.authClient.emit(AuthPattern.OAUTH2_GOOGLE_LOGIN, 'null');
  }

  async googleAuthRedirect(user: any) {
    // return user;
    return this.authClient.send(AuthPattern.OAUTH2_GOOGLE_LOGIN, user);
  }

  async facebookAuthRedirect(user: any) {
    return this.authClient.send(AuthPattern.OAUTH2_FACEBOOK_LOGIN, user);
  }

  async getUser(token: string) {
    return this.authClient.send('get_user', { token });
  }
}
