import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateProductDetailDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiPropertyOptional()
  @IsString()
  colorId: string;

  @ApiPropertyOptional()
  @IsString()
  sizeId: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @IsNumber()
  originalPrice: number;

  @ApiProperty()
  @IsArray()
  images: string[];
}
