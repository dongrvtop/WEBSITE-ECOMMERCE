"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    static from(data = null, statusCode = 200, message = 'Success') {
        return {
            statusCode: statusCode,
            message: message,
            data,
        };
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=success-response.js.map