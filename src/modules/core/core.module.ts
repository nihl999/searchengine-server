import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { HealthService } from './core.service';
import { MongoModule } from 'src/shared/modules/mongo/mongo.module';
import { CreateSchemaUsecase } from './application/create-schema.usecase';
import { SchemaController } from './schema.controller';

@Module({
  imports: [
    MongoModule.forFeature({
      collections: ['schemas', 'objects'],
      connectionName: 'default',
    }),
  ],
  controllers: [CoreController, SchemaController],
  providers: [HealthService, CreateSchemaUsecase],
})
export class CoreModule {}
