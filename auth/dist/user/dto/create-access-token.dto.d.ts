import { RoleType } from 'src/constants/role-type';
import { TokenType } from 'src/constants/token-type';
export declare class CreateAccessTokenDto {
    userId: string;
    role: RoleType;
    type: TokenType;
}
