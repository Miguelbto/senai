import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevelopersModule } from './developers/developers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*entity{.ts,.js}'],
      synchronize: true, //apenas para desenvolvimento
    }),
    DevelopersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
