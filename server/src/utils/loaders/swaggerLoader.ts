import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// eslint-disable-next-line func-names
export const swaggerLoader = function (app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Movie Documentation')
    .setDescription('Movie API Description')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const swaggerCustomOptions = {
    swaggerOptions: {
      docExpansion: 'none',
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
    },
  };

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document, swaggerCustomOptions);
};
