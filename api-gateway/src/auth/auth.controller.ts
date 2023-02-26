import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';
import { RoleType } from './enum/role-type';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  // @ApiQuery({
  //   name: 'role',
  //   // default: RoleType.USER,
  //   example: RoleType.USER,
  //   enum: RoleType,
  // })
  createUser(@Body() data: CreateUserDto) {
    return this.authService.createUser(data);
  }

  @Post('/login')
  login(@Body() data: UserLoginDto) {
    return this.authService.login(data);
  }

  @Get('/get-user')
  getUser() {
    return this.authService.getUser();
  }
}
