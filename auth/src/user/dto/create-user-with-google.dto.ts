import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { RoleType } from 'src/constants/role-type';

export class CreateUserWithGoogle {
  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  googleId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatarUrl: string;

  @ApiProperty({ default: RoleType.USER })
  @IsString()
  role: string;
}
