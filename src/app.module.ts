import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { MongoModule } from './shared/modules/mongo/mongo.module';

@Module({
  imports: [
    MongoModule.forRoot({
      connectionName: 'default',
      uri: 'mongodb://root:example@localhost:27017/nexus_db?authSource=admin',
      database: 'default',
    }),
    CoreModule,
  ],
})
export class AppModule {}
