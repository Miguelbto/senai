import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopersModule } from './developers/developers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from './developers/entities/developer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: [Developer],
      synchronize: true, //apenas para desenvolvimento
    }),
    DevelopersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
