import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SuccessResponse } from '../../../common/helpers';
import { CreateUserDto } from './dto/create-user.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserMessages } from './enum/user-messages';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMessages.USER_REGISTER)
  async createUser(@Payload(ValidationPipe) data: CreateUserDto): Promise<SuccessResponse> {
    const response: SuccessResponse = await this.userService.register(data);
    console.log(`=====REGISTER ${response}`);
    return response;
  }

  @MessagePattern(UserMessages.USER_LOGIN)
  async userLogin(@Payload(ValidationPipe) data: UserLoginDto): Promise<SuccessResponse> {
    const response: SuccessResponse = await this.userService.login(data);
    console.log(`=====LOGIn ${response}`);
    return response;
  }

  @MessagePattern(UserMessages.REFRESH_ACCESS_TOKEN)
  async refreshAccessToken(@Payload(ValidationPipe) data: RefreshAccessTokenDto): Promise<SuccessResponse> {
    console.log(`=================Refresh token controller`);
    const response: SuccessResponse = await this.userService.refreshAccessToken(data);
    return response;
  }

  @MessagePattern('get_user')
  getUser(@Payload(ValidationPipe) data: any) {
    const { token } = data;
    console.log(`======================${token}`);
    return this.userService.getUser(token);
  }
}
