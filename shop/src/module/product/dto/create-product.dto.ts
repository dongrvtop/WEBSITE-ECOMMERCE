import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateProductColorDto } from './create-product-color.dto';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  shopId: string;

  //   @ApiProperty()
  //   @IsString()
  //   categoryId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  quantityInStock: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  originalPrice: number;

  @ApiProperty()
  @IsNumber()
  minPrice: number;

  @ApiProperty()
  @IsNumber()
  maxPrice: number;

  @ApiPropertyOptional()
  @IsNumber()
  discountPercent: number;

  @ApiPropertyOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductColorDto)
  color: CreateProductColorDto[];

  @ApiPropertyOptional()
  @IsArray()
  sizeIds: string[];
}
