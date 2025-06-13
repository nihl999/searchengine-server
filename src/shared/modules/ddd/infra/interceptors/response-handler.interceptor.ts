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
  meta: unknown;
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
      map((result: Result<T, E>) => {
        if (result.isOk) {
          return {
            data: result.value,
            meta: {
              timestamp: new Date().toISOString(),
            },
          };
        } else {
          const exception = result.error;
          response.status(exception.statusCode);
          return {
            error: exception.key,
            message: exception.message,
          };
        }
      }),
    );
  }
}
