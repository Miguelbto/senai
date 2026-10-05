import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * @Global() — importado uma vez no AppModule, disponível em qualquer
 * módulo de bounded context sem precisar reimportar. É uma exceção
 * deliberada ao isolamento entre módulos: o acesso ao banco é
 * infraestrutura compartilhada, não uma regra de negócio de um contexto.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
