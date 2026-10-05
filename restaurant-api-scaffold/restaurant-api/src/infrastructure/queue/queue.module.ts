import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Registra a CONEXÃO com o Redis uma única vez (forRootAsync).
 * Cada bounded context que precisar de uma fila específica vai usar
 * `BullModule.registerQueue({ name: QUEUE_NAMES.X })` dentro do próprio
 * módulo dele (ex.: floor-management.module.ts na Fase 2) — a conexão
 * aqui é compartilhada, a fila em si é responsabilidade do contexto.
 *
 * Decisão #2 (revisada): o job de no-show de reserva deixou de ser
 * node-cron e passou a ser um delayed job do BullMQ, disparado no
 * momento em que a reserva é criada (delay = 20min), e cancelado se uma
 * comanda for aberta na mesa antes disso.
 */
@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('redis.host'),
          port: config.get<number>('redis.port'),
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
