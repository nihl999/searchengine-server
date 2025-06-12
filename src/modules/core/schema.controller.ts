import { Body, Controller, Post } from '@nestjs/common';
import { CreateSchemaUsecaseInput } from './application/create-schema.dto';
import { CreateSchemaUsecase } from './application/create-schema.usecase';

@Controller({ path: 'schemas', version: '1' })
export class SchemaController {
  constructor(private readonly createSchemaUsecase: CreateSchemaUsecase) {}

  @Post()
  async createSchema(@Body() body: CreateSchemaUsecaseInput) {
    return await this.createSchemaUsecase.execute(body);
  }
}
