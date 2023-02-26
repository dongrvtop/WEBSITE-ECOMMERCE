import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  accessToken: string;

  constructor(data: { expiresIn: number; accessToken: string }) {
    this.accessToken = data.accessToken;
    this.expiresIn = data.expiresIn;
  }
}
