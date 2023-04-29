import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors
  app.enableCors();

  // prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // validation pipeline
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('npp API')
    .setDescription('NestJs Prisma Postgresql Template')
    .setVersion('1.0')
    .addTag('isel-jao')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, document);

  // add api prefix
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
