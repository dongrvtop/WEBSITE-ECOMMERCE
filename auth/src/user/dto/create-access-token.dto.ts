import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from 'src/constants/role-type';
import { TokenType } from 'src/constants/token-type';

export class CreateAccessTokenDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  role: RoleType;

  @ApiProperty()
  type: TokenType;
}
