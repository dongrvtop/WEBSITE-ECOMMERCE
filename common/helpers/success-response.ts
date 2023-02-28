export class SuccessResponse {
    static from(data: any = null, statusCode = 200, message = 'Success') {
        return {
            statusCode: statusCode,
            message: message,
            data,
        }
    }
}