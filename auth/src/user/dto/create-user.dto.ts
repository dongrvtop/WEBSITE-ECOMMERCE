import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { RoleType } from 'src/constants/role-type';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  userName: string;

  @ApiProperty({ required: true, minLength: 8 })
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ default: RoleType.USER })
  @IsString()
  role: string;
}
