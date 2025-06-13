/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/common/decorators/api-result-response.decorator.ts
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ErrorResponseDto } from '../application/dto/error.dto';
import { SuccessResponseDto } from '../application/dto/success.dto';
import { BaseException } from '../domain/exception';

//TODO Refine this more
export const generateSwaggerResponses = <
  TModel extends Type<any>,
  TError extends Type<BaseException>,
>(
  model: TModel,
  errors: TError[],
  successStatusCode: HttpStatus,
) => {
  const apiResponses: (MethodDecorator & ClassDecorator)[] = [];
  const extraModels: any = [SuccessResponseDto, model, ErrorResponseDto];
  errors.forEach((error) => {
    extraModels.push(error);

    // Create a temporary instance to get statusCode and message for Swagger documentation
    // IMPORTANT: Make sure your BaseException constructor (and its children)
    // can be instantiated with dummy arguments like 'Dummy message for Swagger', 0.
    // If your constructors have stricter requirements, adjust these arguments.
    const tempErrorInstance = new error('Dummy message for Swagger'); // Assuming BaseException constructor takes message and status code

    apiResponses.push(
      ApiResponse({
        status: tempErrorInstance.statusCode,
        description: `${error.name}: ${tempErrorInstance.message}`, // Include class name for clarity
        schema: {
          $ref: getSchemaPath(ErrorResponseDto), // Assuming all errors return the same ErrorResponseDto structure
        },
      }),
    );
  });

  return applyDecorators(
    ApiExtraModels(SuccessResponseDto, model, ErrorResponseDto),
    ApiResponse({
      status: successStatusCode,
      description: 'Successful response',
      schema: {
        allOf: [
          { $ref: getSchemaPath(SuccessResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
    ...apiResponses,
  );
};

export const ApiGetResultResponse = <
  TModel extends Type<any>,
  TError extends Type<BaseException>[],
>(
  model: TModel,
  errorClasses: TError,
) => generateSwaggerResponses(model, errorClasses, HttpStatus.OK);

export const ApiPostResultResponse = <
  TModel extends Type<any>,
  TError extends Type<BaseException>[],
>(
  model: TModel,
  errorClasses: TError,
) => generateSwaggerResponses(model, errorClasses, HttpStatus.CREATED);

export const ApiPutResultResponse = <
  TModel extends Type<any>,
  TError extends Type<BaseException>[],
>(
  model: TModel,
  errorClasses: TError,
) => generateSwaggerResponses(model, errorClasses, HttpStatus.OK);

export const ApiDeleteResultResponse = <
  TModel extends Type<any>,
  TError extends Type<BaseException>[],
>(
  model: TModel,
  errorClasses: TError,
  // Optionally allow 204 No Content for DELETE
  successStatusCode: HttpStatus = HttpStatus.NO_CONTENT,
) => generateSwaggerResponses(model, errorClasses, successStatusCode);

// You can still have a generic one if needed for custom statuses
export const ApiCustomResultResponse = <
  TModel extends Type<any>,
  TError extends Type<BaseException>[],
>(
  model: TModel,
  errorClasses: TError,
  successStatusCode: HttpStatus,
) => generateSwaggerResponses(model, errorClasses, successStatusCode);
