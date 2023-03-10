export declare class SuccessResponse {
    static from(data?: any, statusCode?: number, message?: string): {
        statusCode: number;
        message: string;
        data: any;
    };
}
