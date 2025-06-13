import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  CreateSchemaUsecaseInput,
  CreateSchemaUsecaseOutput,
} from './application/create-schema/create-schema.dto';
import { CreateSchemaUsecase } from './application/create-schema/create-schema.usecase';
import { GetAllSchemasQuery } from './application/get-all-schema/get-all-schema.usecase';
import { ResultAsync } from 'src/shared/modules/ddd/application/usecase';
import { GetAllSchemasOutput } from './application/get-all-schema/get-all-schema.dto';
import { DBNotFoundError } from './domain/exceptions/DBNotFound.exception';
import {
  ApiGetResultResponse,
  ApiPostResultResponse,
  generateSwaggerResponses,
} from 'src/shared/modules/ddd/decorators/api-response.decorator';
import { DBSelectError } from './domain/exceptions/DBSelect.exception';
import { DBInsertError } from './domain/exceptions/DBInsert.exception';

@Controller({ path: 'schemas', version: '1' })
export class SchemaController {
  constructor(
    private readonly createSchemaUsecase: CreateSchemaUsecase,
    private readonly getAllSchemasQuery: GetAllSchemasQuery,
  ) {}

  @Post()
  @ApiPostResultResponse(CreateSchemaUsecaseOutput, [DBInsertError])
  async createSchema(@Body() body: CreateSchemaUsecaseInput) {
    return await this.createSchemaUsecase.execute(body);
  }

  @Get()
  @ApiGetResultResponse(GetAllSchemasOutput, [DBNotFoundError, DBSelectError])
  async getAllSchemas(): ResultAsync<
    GetAllSchemasOutput,
    DBNotFoundError | DBSelectError
  > {
    return await this.getAllSchemasQuery.execute();
  }
}
