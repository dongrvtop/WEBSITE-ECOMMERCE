import { Controller, ValidationPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('create_user')
  createUser(@Payload(ValidationPipe) data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @MessagePattern('get_user')
  getUser() {
    return this.userService.getUser();
  }
}
