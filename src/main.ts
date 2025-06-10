import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'env.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(config.PORT || 3000);
}
void bootstrap();
