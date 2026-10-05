import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

interface ErrorBody {
  error: {
    code: string;
    message: string;
    details: unknown[];
  };
}

/**
 * Filtro global: captura QUALQUER exceção (HttpException do Nest ou erro
 * não tratado) e devolve sempre o mesmo formato (RN-TRANS-03):
 *
 *   { "error": { "code": "...", "message": "...", "details": [] } }
 *
 * Mais pra frente, quando criarmos DomainError/DomainException no domínio
 * (Fase 0), vamos capturá-las aqui também e mapear para o `code` certo
 * (ex.: INSUFFICIENT_PAYMENT, COMANDA_VERSION_CONFLICT) — por enquanto o
 * filtro só cobre o básico do HTTP.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const body: ErrorBody = this.buildBody(exception, status);

    if (status >= 500) {
      this.logger.error(exception instanceof Error ? exception.stack : exception);
    }

    response.status(status).send(body);
  }

  private buildBody(exception: unknown, status: number): ErrorBody {
    if (exception instanceof HttpException) {
      const payload = exception.getResponse();
      const message =
        typeof payload === 'string' ? payload : (payload as { message?: string }).message ?? exception.message;
      const details = typeof payload === 'object' ? (payload as { message?: unknown }).message : [];

      return {
        error: {
          code: HttpStatus[status] ?? 'HTTP_ERROR',
          message: Array.isArray(message) ? message.join(', ') : message,
          details: Array.isArray(details) ? details : [],
        },
      };
    }

    return {
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Ocorreu um erro inesperado.',
        details: [],
      },
    };
  }
}
