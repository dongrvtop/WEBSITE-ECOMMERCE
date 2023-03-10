import { RoleType } from 'src/constants/role-type';
import { TokenType } from 'src/constants/token-type';
export declare class CreateTokenDto {
    userId?: string;
    email?: string;
    role: RoleType;
    type?: TokenType;
}
