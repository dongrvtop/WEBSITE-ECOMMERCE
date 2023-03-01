import { RoleType } from '../enum/role-type';
export declare class CreateUserDto {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: RoleType;
}
