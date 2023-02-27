import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ required: true, example: 'dongnd' })
  @IsString()
  userName: string;

  @ApiProperty({ required: true, example: '12345678' })
  @IsString()
  password: string;
}
