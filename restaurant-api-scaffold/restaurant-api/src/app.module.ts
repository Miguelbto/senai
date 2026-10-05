import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration, { envValidationSchema } from './config/configuration';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { IdentityModule } from './modules/identity/identity.module';
import { FloorManagementModule } from './modules/floor-management/floor-management.module';
import { MenuCatalogModule } from './modules/menu-catalog/menu-catalog.module';
import { OrderManagementModule } from './modules/order-management/order-management.module';
import { BillingModule } from './modules/billing/billing.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    // isGlobal: true -> ConfigService fica disponível em qualquer módulo
    // sem precisar reimportar ConfigModule em cada um deles.
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: envValidationSchema,
      validationOptions: { abortEarly: false }, // mostra TODOS os env vars
      // inválidos de uma vez, não só o primeiro — poupa um ciclo de
      // "corrige um, roda, descobre o próximo" ao configurar o ambiente.
    }),
    PrismaModule,
    QueueModule,
    IdentityModule,
    FloorManagementModule,
    MenuCatalogModule,
    OrderManagementModule,
    BillingModule,
    AuditModule,
  ],
})
export class AppModule {}
