import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { RoleType } from 'src/constants/role-type';

export class CreateUserWithFacebook {
  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  facebookId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatarUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  birthday: Date;

  @ApiProperty()
  profileUrl: string;

  @ApiProperty({ default: RoleType.USER })
  @IsString()
  role: string;
}
