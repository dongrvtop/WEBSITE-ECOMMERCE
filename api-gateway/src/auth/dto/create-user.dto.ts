import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleType } from '../enum/role-type';

export class CreateUserDto {
  @ApiProperty({ required: true, example: 'dongnd' })
  @IsString()
  userName: string;

  @ApiProperty({ required: true, minLength: 8, example: '12345678' })
  @IsString()
  password: string;

  @ApiProperty({ required: true, example: 'Đồng' })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true, example: 'Nguyễn Duy' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '0868686868' })
  @IsString()
  phoneNumber: string;

  @ApiPropertyOptional({
    enum: RoleType,
    enumName: 'role',
    default: RoleType.USER,
  })
  @IsEnum(RoleType)
  role: RoleType;
}
