import { IsString } from "class-validator";

export class RefreshAccessTokenDto {
    @IsString()
    userId: string;

    @IsString()
    refreshToken: string;
}