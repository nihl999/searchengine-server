import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Result } from 'true-myth';
import { BaseException } from '../../domain/exception';
import { Response } from 'express';

// --- Response Structures ---

/**
 * Defines the standardized structure for a successful response.
 */
export interface SuccessResponse<T> {
  data: T;
  timestamp: string;
}

/**
 * Defines the standardized structure for an error response.
 */
export interface ErrorResponse {
  error: string; // The 'key' from the BaseException
  message: string;
}

// --- Interceptor Implementation ---

@Injectable()
export class ResultInterceptor<T, E extends BaseException>
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<Promise<Result<T, E>>>,
  ): Observable<SuccessResponse<T> | ErrorResponse> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      // Use switchMap to handle the Promise resolution from the controller
      switchMap(async (resultPromise) => {
        try {
          const result = await resultPromise;
          return result;
        } catch {
          // This catches errors that might happen *before* a Result is even created,
          // such as an issue within an async function itself.
          return Result.err(
            new (class extends BaseException {})(
              'An unexpected error occurred while processing the request.',
              HttpStatus.INTERNAL_SERVER_ERROR,
              'UnhandledPromiseRejection',
            ) as E,
          );
        }
      }),
      // Use map to transform the resolved Result object
      map((result: Result<T, E>) => {
        if (result.isOk) {
          // If the result is Ok, return a standardized success response.
          return {
            data: result.value,
            timestamp: new Date().toISOString(),
          };
        } else {
          // If the result is Err, handle the custom BaseException.
          const exception = result.error;

          // Set the HTTP status code on the actual response object.
          response.status(exception.statusCode);

          // Return a standardized error response using properties from BaseException.
          return {
            error: exception.key,
            message: exception.message,
          };
        }
      }),
    );
  }
}
