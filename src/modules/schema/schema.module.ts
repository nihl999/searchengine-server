import { Module } from '@nestjs/common';
import { MongoModule } from 'src/shared/modules/mongo/mongo.module';
import { SchemaController } from './schema.controller';
import { CreateSchemaUsecase } from './application/create-schema/create-schema.usecase';
import { GetAllSchemasQuery } from './application/get-all-schema/get-all-schema.usecase';

@Module({
  imports: [
    MongoModule.forFeature({
      collections: ['schemas', 'objects'],
      connectionName: 'default',
    }),
  ],
  controllers: [SchemaController],
  providers: [CreateSchemaUsecase, GetAllSchemasQuery],
})
export class SchemaModule {}
