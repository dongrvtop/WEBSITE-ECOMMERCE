import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'dongnd@gmail.com', nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Đồng', nullable: false })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Nguyễn Duy', nullable: false })
  @IsString()
  lastName: string;
}
