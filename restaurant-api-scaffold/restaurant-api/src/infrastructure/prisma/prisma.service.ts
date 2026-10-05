import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService é o ÚNICO ponto do código que conhece o Prisma diretamente.
 * Repositórios concretos (ex.: PrismaComandaRepository, criado na Fase 4)
 * recebem este service por injeção — o domínio nunca importa @prisma/client.
 *
 * OnModuleInit/OnModuleDestroy: conecta quando o Nest sobe o módulo e
 * desconecta de forma limpa quando a aplicação é finalizada (SIGTERM do
 * Docker, por exemplo) — evita conexões "penduradas" no Postgres.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
