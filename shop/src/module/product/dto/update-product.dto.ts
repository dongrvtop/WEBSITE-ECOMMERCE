import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateProductColorDto } from './create-product-color.dto';

export class UpdateProductDto {
  @ApiProperty({ required: true })
  @IsString()
  id: string;

  @ApiPropertyOptional()
  @IsString()
  categoryId: string;

  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  quantityInStock: number;

  @ApiPropertyOptional()
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @IsNumber()
  originalPrice: number;

  @ApiPropertyOptional()
  @IsNumber()
  minPrice: number;

  @ApiPropertyOptional()
  @IsNumber()
  maxPrice: number;

  @ApiPropertyOptional()
  @IsNumber()
  discountPercent: number;

  @ApiPropertyOptional()
  @IsString()
  description: string;
}
