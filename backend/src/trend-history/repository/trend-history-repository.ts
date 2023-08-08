import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { of, lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  createSuccess,
  createError,
} from '@src/response-result/response-result';
import {
  SuccessResponse,
  ErrorResponse,
} from '@src/response-result/response-result-type';
import { AxiosResponse } from 'axios';
import { PrismaService } from '@src/prisma.service';
import { TrendHistory } from '../trend-history';
import { IHistoryUniqueKey, ITrendHistory } from '../trend-history-type';
import { SiteValue } from '@src/site/site-value';
import {
  QiitaTrendFeed,
  QiitaArticle,
  ZennArticle,
} from '../trend-article-type';
import { BaseDateTime } from '@src/date/base-date-time';
import { xml2json } from 'xml-js';

@Injectable()
export class TrendHistoryRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  // DBから、指定した日付のトレンド記事を取得する
  async findTrendHistory({
    siteId,
    importDate,
  }: IHistoryUniqueKey): Promise<TrendHistory | undefined> {
    const trendHistoryData = await this.prisma.trendHistory.findUnique({
      where: {
        siteId_importDate: {
          siteId,
          importDate,
        },
      },
      include: {
        TrendArticle: true,
      },
    });

    if (!trendHistoryData) {
      return undefined;
    }

    const trendHistoryModel: ITrendHistory = {
      id: trendHistoryData.id,
      siteId: SiteValue.fromNumberToSiteId(trendHistoryData.siteId),
      importDate: trendHistoryData.importDate,
      trendArticleList: trendHistoryData.TrendArticle,
    };

    return TrendHistory.create(trendHistoryModel);
  }

  async findWeekTrendHistory({
    siteName,
    importDate,
  }: {
    siteName: string;
    importDate: BaseDateTime;
  }): Promise<TrendHistory[] | undefined> {
    const trendHistoryData = await this.prisma.trendHistory.findMany({
      where: {
        importDate: {
          gte: importDate.oneWeekAgo().toDate(),
          lte: importDate.toDate(),
        },
        siteId: SiteValue.fromNameToId(siteName),
      },
      orderBy: {
        importDate: 'desc',
      },
      include: {
        TrendArticle: true,
      },
    });

    if (!trendHistoryData.length) {
      return undefined;
    }

    return trendHistoryData.map((trendHistoryData) => {
      const trendHistoryModel: ITrendHistory = {
        id: trendHistoryData.id,
        siteId: SiteValue.fromNumberToSiteId(trendHistoryData.siteId),
        importDate: trendHistoryData.importDate,
        trendArticleList: trendHistoryData.TrendArticle,
      };

      return TrendHistory.create(trendHistoryModel);
    });
  }

  // ZennのAPIを叩いて、トレンド記事を取得する
  requestZennTrendAPI(
    baseDateTime: BaseDateTime,
  ): Promise<SuccessResponse<TrendHistory> | ErrorResponse<string>> {
    const resultObservable = this.httpService
      .get(SiteValue.getZennTrendApiUrl())
      .pipe(
        map((response: AxiosResponse<ZennArticle[]>) => {
          const trendHistory = TrendHistory.createFromZennResponse(
            baseDateTime,
            response.data,
          );

          return createSuccess(trendHistory, 200);
        }),
        // エラー対応。
        // 正常処理のストリームを中断し、エラー処理のストリームを返す
        catchError(({ response }) => {
          console.log(response);
          return of<ErrorResponse<string>>(
            createError(response?.statusText ?? '', response.status),
          );
        }),
      );

    return lastValueFrom(resultObservable);
  }

  // QiitaのAPIを叩いて、トレンド記事を取得する
  requestQiitaTrendAPI(
    baseDateTime: BaseDateTime,
  ): Promise<SuccessResponse<any> | ErrorResponse<string>> {
    const resultObservable = this.httpService
      .get(SiteValue.getQiitaTrendApiUrl())
      .pipe(
        map((response: AxiosResponse<QiitaArticle[]>) => {
          const getResponseData = (response) => {
            return response.data;
          };
          const xml: QiitaTrendFeed = JSON.parse(
            xml2json(getResponseData(response), {
              compact: true,
            }),
          );
          const trendHistory = TrendHistory.createFromQiitaResponse(
            baseDateTime,
            xml,
          );

          return createSuccess(trendHistory, 200);
        }),
        // エラー対応。
        // 正常処理のストリームを中断し、エラー処理のストリームを返す
        catchError(({ response }) => {
          return of<ErrorResponse<string>>(
            createError(response?.statusText ?? '', response.status),
          );
        }),
      );

    return lastValueFrom(resultObservable);
  }

  // TrendHistoryの保存を行います。
  async saveTrendHistory(trendHistory: TrendHistory): Promise<void> {
    const exsitTrendHistory = await this.findTrendHistory({
      siteId: trendHistory.uniqueKey.siteId,
      importDate: trendHistory.uniqueKey.importDate,
    });
    if (!exsitTrendHistory) {
      await this.createTrendHistory(trendHistory);
    } else {
      await this.updateTrendHistory(trendHistory, exsitTrendHistory.id);
    }
  }

  private async createTrendHistory(trendHistory: TrendHistory): Promise<void> {
    const trendArticleData = trendHistory.trendArticleList.toObject();

    await this.prisma.trendHistory.create({
      data: {
        siteId: trendHistory.uniqueKey.siteId,
        importDate: trendHistory.uniqueKey.importDate,
        TrendArticle: {
          create: trendArticleData,
        },
      },
    });
  }

  // TrendHistoryの更新を行います。
  private async updateTrendHistory(
    trendHistory: TrendHistory,
    trendHistoryId: number,
  ): Promise<void> {
    const articleList = trendHistory.trendArticleList.toArray();

    const updateQuery = articleList.map((article) => {
      return this.prisma.trendArticle.upsert({
        where: {
          trendHistoryId_articleId: {
            trendHistoryId: trendHistoryId,
            articleId: article.articleId,
          },
        },
        update: {
          url: article.url,
        },
        create: {
          trendHistoryId: trendHistoryId,
          articleId: article.articleId,
          title: article.title,
          url: article.url,
        },
      });
    });

    await this.prisma.$transaction(updateQuery);
  }
}
