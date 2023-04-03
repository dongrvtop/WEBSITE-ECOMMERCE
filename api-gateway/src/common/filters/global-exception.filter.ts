import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let resultCode: number, httpStatus: number, errorMessage: string;

    if (exception instanceof BadRequestException) {
      httpStatus = HttpStatus.BAD_REQUEST;
    } else if (exception instanceof NotFoundException) {
      httpStatus = HttpStatus.NOT_FOUND;
    } else if (exception instanceof NotAcceptableException) {
      httpStatus = HttpStatus.NOT_ACCEPTABLE;
    } else if (exception instanceof UnauthorizedException) {
      httpStatus = HttpStatus.UNAUTHORIZED;
    } else if (exception instanceof InternalServerErrorException) {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof HttpException) {
      httpStatus = HttpStatus.BAD_GATEWAY;
    } else if (exception instanceof RpcException) {
      httpStatus = error.status;
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    console.log(`CHECK: ${JSON.stringify(exception)}`);

    if (typeof exception?.getResponse?.() == 'object') {
      errorMessage = exception?.getResponse?.().message ?? exception.message;
    } else {
      errorMessage = exception?.getResponse?.().toString() ?? exception.message;
    }

    response
      .status(error.status)
      .json({ statusCode: httpStatus, errorMessage, error: exception.name });
    // return throwError(() => response);
  }
}
