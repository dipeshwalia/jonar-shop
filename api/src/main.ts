import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './transform.interceptor';

const setupSwagger = (app) => {
  const options = new DocumentBuilder()
    .setTitle('Jonar Shop Api')
    .setDescription('Apis for making magic happen')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
};

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT') || 3000;
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api');
  setupSwagger(app);

  logger.log(`Application is running on: http://localhost:${port}`);
  await app.listen(port);
}

bootstrap();
