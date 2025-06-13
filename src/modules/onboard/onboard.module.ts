import { Module } from '@nestjs/common';
import { OnboardController } from './onboard.controller';

@Module({
  imports: [
    // MongoModule.forFeature({
    //   collections: ['schemas', 'objects'],
    //   connectionName: 'default',
    // }),
  ],
  controllers: [OnboardController],
  providers: [],
})
export class CoreModule {}
