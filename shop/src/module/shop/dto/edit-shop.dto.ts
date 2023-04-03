import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EditShopDto {
  @ApiProperty({ required: true })
  @IsString()
  id: string;

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
