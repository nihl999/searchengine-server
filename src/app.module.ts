import { Module } from '@nestjs/common';
import { SchemaModule } from './modules/schema/schema.module';
import { MongoModule } from './shared/modules/mongo/mongo.module';
import { HealthModule } from './shared/modules/health/health.module';

@Module({
  imports: [
    MongoModule.forRoot({
      connectionName: 'default',
      uri: 'mongodb://root:example@localhost:27017/nexus_db?authSource=admin',
      database: 'default',
    }),
    SchemaModule,
    HealthModule,
  ],
})
export class AppModule {}
