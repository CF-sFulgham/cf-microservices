import { Config } from './shared/modules/config/config.service';
import { AppLogger } from './shared/modules/logging/logging.service';
import AxiosAdapter from './shared/utils/axios';
import { AppModule } from './app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { SerializationInterceptor } from './shared/interceptors/serialization.interceptor';

const enableCors: boolean = Config.get('enableCors');
const logger = AppLogger.create();

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    cors: enableCors,
    logger,
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  }));
  app.useLogger(logger);
  app.use(bodyParser.json());
  app.use(AxiosAdapter.init({
    passthruHeaders: [
      'authorization',
    ],
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SerializationInterceptor(app.get(Reflector)));

  const options = new DocumentBuilder()
    .setTitle('CreationFoundation API')
    .setDescription('Creation Foundation API\'s for Marketing, Customer Dashboard and Blog websites.')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(Config.get('port'));
  logger.log(`listening on port ${Config.get('port')}`);
};

bootstrap();
