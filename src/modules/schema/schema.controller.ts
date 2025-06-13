import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResultAsync } from 'src/shared/modules/ddd/application/usecase';
import {
  ApiGetResultResponse,
  ApiPostResultResponse,
} from 'src/shared/modules/ddd/decorators/api-response.decorator';
import {
  CreateSchemaUsecaseInput,
  CreateSchemaUsecaseOutput,
} from './application/create-schema/create-schema.dto';
import { CreateSchemaUsecase } from './application/create-schema/create-schema.usecase';
import { GetAllSchemasOutput } from './application/get-all-schema/get-all-schema.dto';
import { GetAllSchemasQuery } from './application/get-all-schema/get-all-schema.usecase';
import { DBInsertError } from './domain/exceptions/DBInsert.exception';
import { DBNotFoundError } from './domain/exceptions/DBNotFound.exception';
import { DBSelectError } from './domain/exceptions/DBSelect.exception';
import { AuthSession, Session } from 'src/shared/modules/auth/session.mock';

@Controller({ path: 'schemas', version: '1' })
export class SchemaController {
  constructor(
    private readonly createSchemaUsecase: CreateSchemaUsecase,
    private readonly getAllSchemasQuery: GetAllSchemasQuery,
  ) {}

  @Post()
  @ApiPostResultResponse(CreateSchemaUsecaseOutput, [DBInsertError])
  async createSchema(
    @Session() session: AuthSession,
    @Body() body: CreateSchemaUsecaseInput,
  ) {
    return await this.createSchemaUsecase.execute(body, session);
  }

  @Get()
  @ApiGetResultResponse(GetAllSchemasOutput, [DBNotFoundError, DBSelectError])
  async getAllSchemas(
    @Session() session: AuthSession,
  ): ResultAsync<GetAllSchemasOutput, DBNotFoundError | DBSelectError> {
    return await this.getAllSchemasQuery.execute(undefined, session);
  }
}
