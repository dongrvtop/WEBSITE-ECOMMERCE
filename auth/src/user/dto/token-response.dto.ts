import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  token: string;

  constructor(data: { expiresIn: number; token: string }) {
    this.token = data.token;
    this.expiresIn = data.expiresIn;
  }
}
