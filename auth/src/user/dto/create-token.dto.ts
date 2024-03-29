import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from 'src/constants/role-type';
import { TokenType } from 'src/constants/token-type';

export class CreateTokenDto {
  @ApiProperty()
  userId?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  role: RoleType;

  @ApiProperty()
  type?: TokenType;
}
