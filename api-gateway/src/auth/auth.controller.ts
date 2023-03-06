import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  UseGuards,
  Request,
  Redirect,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login-dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  createUser(@Body() data: CreateUserDto) {
    return this.authService.createUser(data);
  }

  @Post('/login')
  login(@Body() data: UserLoginDto) {
    console.log(`bbbbbbbbbbbbbbbbbbbb`);
    return this.authService.login(data);
  }

  @Post('/refresh-token')
  refreshAccessToken(
    @Query('userId') userId: string,
    @Query('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshAccessToken(userId, refreshToken);
  }

  @Get('/google')
  // @Redirect('http://localhost:3000/auth/google')
  @UseGuards(AuthGuard('google'))
  googleLogin(@Res() res: Response) {
    return res.redirect('http://localhost:3000/auth/google');
    return this.authService.googleLogin();
  }
  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleAuthRedirect(req.user);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookLogin() {
    return 'Login by oauth2.0 facebook';
  }

  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req) {
    return this.authService.facebookAuthRedirect(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req['user'];
  }

  @Get('/get-user')
  getUser(@Query('token') token: string) {
    return this.authService.getUser(token);
  }
}
