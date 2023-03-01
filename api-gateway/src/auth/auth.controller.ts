import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  createUser(@Body() data: CreateUserDto) {
    return this.authService.createUser(data);
  }

  @Post('/login')
  login(@Body() data: UserLoginDto) {
    return this.authService.login(data);
  }

  @Post('/refresh-token')
  refreshAccessToken(
    @Query('userId') userId: string,
    @Query('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshAccessToken(userId, refreshToken);
  }

  @Get('/auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleAuthRedirect(req);
  }

  @Get('/get-user')
  getUser(@Query('token') token: string) {
    return this.authService.getUser(token);
  }
}
