import { Module } from '@nestjs/common';
import { TrendHistoryController } from './trend-history.controller';
import { TrendHistoryRepository } from './trend-history/repository/trend-history-repository';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '@src/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [TrendHistoryController],
  providers: [TrendHistoryRepository, PrismaService],
})
export class TrendHistoryModule {}
