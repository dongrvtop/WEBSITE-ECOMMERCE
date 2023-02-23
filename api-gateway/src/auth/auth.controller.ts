import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  createUser() {
    return this.authService.createUser();
  }

  @Get('/get-user')
  getUser() {
    return this.authService.getUser();
  }
}
