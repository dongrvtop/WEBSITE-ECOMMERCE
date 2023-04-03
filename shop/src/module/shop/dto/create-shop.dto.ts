import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateShopDto {
  @ApiProperty({ required: true })
  @IsString()
  userId: string;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  avatarUrl: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;
}
