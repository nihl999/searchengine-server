import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { HelloService } from './core.service';
import { MongoModule } from 'src/shared/modules/mongo/mongo.module';

@Module({
  imports: [
    MongoModule.forFeature({
      collections: ['schemas', 'objects'],
      connectionName: 'default',
    }),
  ],
  controllers: [CoreController],
  providers: [HelloService],
})
export class CoreModule {}
