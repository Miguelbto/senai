import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  // Fastify é o motor HTTP real por baixo do NestJS — ganhamos a organização
  // do Nest (módulos, DI, decorators) sem perder a performance do Fastify.
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );

  const configService = app.get(ConfigService);

  // RN-TRANS-04: todas as rotas de negócio vivem sob /api/v1.
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Validação automática de DTOs (class-validator) em toda rota.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos não declarados no DTO
      forbidNonWhitelisted: true, // rejeita payload com campo extra (422)
      transform: true, // converte payload para a instância da classe do DTO
    }),
  );

  // RN-TRANS-03: todo erro da API sai no formato { error: { code, message, details } }.
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = configService.get<number>('app.port') ?? 3000;
  await app.listen(port, '0.0.0.0');
}

bootstrap();
