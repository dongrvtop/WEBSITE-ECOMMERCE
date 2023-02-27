import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RoleType } from 'src/constants/role-type';
import { TokenType } from 'src/constants/token-type';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserMessages } from './enum/user-messages';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMessages.USER_REGISTER)
  createUser(@Payload(ValidationPipe) data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @MessagePattern(UserMessages.USER_LOGIN)
  async userLogin(@Payload(ValidationPipe) data: UserLoginDto) {
    const user = await this.userService.validateUser(data);
    const accessToken = await this.userService.createAccessToken({
      userId: user.id,
      role: (user.role as RoleType) ?? RoleType.USER,
      type: TokenType.ACCESS_TOKEN,
    });
    const refreshToken = await this.userService.createRefreshToken({
      userId: user.id,
      role: (user.role as RoleType) ?? RoleType.USER,
      type: TokenType.REFRESH_TOKEN,
    });
    return { user, accessToken, refreshToken };
  }

  @MessagePattern('get_user')
  getUser(@Payload(ValidationPipe) data: any) {
    const { token } = data;
    console.log(`======================${token}`);
    return this.userService.getUser(token);
  }
}
