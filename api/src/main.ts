import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));//'src/views');
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true, 
    transformOptions: {
      enableImplicitConversion: true, 
    },
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
