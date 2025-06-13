import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SchemaModule } from './modules/schema/schema.module';
import { MongoModule } from './shared/modules/mongo/mongo.module';
import { HealthModule } from './shared/modules/health/health.module';
import { MockAuthMiddleware } from './shared/modules/auth/session.mock';
import { config } from 'env.config';

@Module({
  imports: [
    MongoModule.forRoot({
      connectionName: 'default',
      uri: config.MONGO_URI,
      database: config.MONGO_DBNAME,
    }),
    SchemaModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MockAuthMiddleware).forRoutes('*');
  }
}
