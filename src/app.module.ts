import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { MongoModule } from './shared/modules/mongo/mongo.module';

@Module({
  imports: [
    MongoModule.forRoot({
      connectionName: 'default',
      uri: 'mongodb://localhost:27017',
      database: 'default',
    }),
    CoreModule,
  ],
})
export class AppModule {}
