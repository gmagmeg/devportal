import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrendHistoryModule } from './trend-history.module';

@Module({
  imports: [HttpModule, TrendHistoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
