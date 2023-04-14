import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductSizeDto {
  @ApiProperty({ required: true })
  @IsString()
  productId: string;

  @ApiProperty({ required: true })
  @IsString()
  name: string;
}
