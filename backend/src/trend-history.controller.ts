import { Controller, Get, Post, Param } from '@nestjs/common';
import { TrendHistoryRepository } from './trend-history/repository/trend-history-repository';
import { createSuccess, createError } from './response-result/response-result';
import { BaseDateTime } from './date/base-date-time';
import { TrendHistory } from './trend-history/trend-history';

@Controller('trend-history')
export class TrendHistoryController {
  constructor(private readonly repository: TrendHistoryRepository) {}

  @Post('save/qiita')
  async saveTrendHistoryQiita() {
    const resultRequest = await this.repository.requestQiitaTrendAPI(
      BaseDateTime.create('now'),
    );
    if (resultRequest.status === 'error') {
      return createError(resultRequest.response, 500);
    }

    await this.repository.saveTrendHistory(resultRequest.response);

    return createSuccess({ message: 'success' });
  }

  @Post('save/zenn')
  async saveTrendHistoryZenn() {
    const resultRequest = await this.repository.requestZennTrendAPI(
      BaseDateTime.create('now'),
    );
    if (resultRequest.status === 'error') {
      return createError(resultRequest.response, 500);
    }

    await this.repository.saveTrendHistory(resultRequest.response);

    return createSuccess({ message: 'success' });
  }

  @Get(':date/:siteName')
  async findWeekTrendHistory(
    @Param('date') date: string,
    @Param('siteName') siteName: string,
  ) {
    try {
      const result = await this.repository.findWeekTrendHistory({
        siteName,
        importDate: BaseDateTime.create(date),
      });

      if (!result) {
        return createSuccess({});
      }
      const successList = result.map((trendHistory: TrendHistory) => {
        return {
          id: trendHistory.id,
          importDate: trendHistory.uniqueKey.importDate,
          siteId: trendHistory.uniqueKey.siteId,
          trendArticleList: trendHistory.trendArticleList.toObject(),
        };
      });

      return createSuccess(successList);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
