import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMessages } from 'src/user/enum/user-messages';
import { Oauth2Service } from './oauth2.service';

@Controller('oauth2')
export class Oauth2Controller {
  constructor(private readonly oauth2Service: Oauth2Service) {}
  @MessagePattern(UserMessages.OAUTH2_GOOGLE_LOGIN)
  async googleAuthRedirect(@Payload(ValidationPipe) token) {
    return this.oauth2Service.authenticate();
  }
}
