import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pjson = require('../package.json');

  const config = new DocumentBuilder()
    .setTitle('Winer API')
    .setDescription(pjson.description)
    .setVersion(pjson.version)
    .addBearerAuth()
    .setLicense(
      'GNU General Public License v3.0',
      'https://raw.githubusercontent.com/Gprisco/winer-unisa/master/LICENSE',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
