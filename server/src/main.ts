import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerLoader } from './utils/loaders';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { env } from './env';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [env.appSetting.appBaseUrlOrigin],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '2mb' }));
  swaggerLoader(app);

  await app.listen(3000);
}
bootstrap();
