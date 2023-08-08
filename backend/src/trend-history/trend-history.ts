import { TrendArticleList } from './trend-article-list';
import { ITrendHistory } from './trend-history-type';
import { Id } from '@src/util/util-type';
import { HistoryUniqueKey } from './history-unique-key';
import { ITrendArticle } from './trend-article-type';
import { SiteValue } from '@src/site/site-value';
import { ZennArticle } from './trend-article-type';
import { BaseDateTime } from '@src/date/base-date-time';
import { QiitaTrendFeed, QiitaArticle } from './trend-article-type';

export class TrendHistory {
  private constructor(
    public readonly id: Id,
    public readonly uniqueKey: HistoryUniqueKey,
    public readonly trendArticleList: TrendArticleList,
  ) {}

  static create(history: ITrendHistory): TrendHistory {
    return new TrendHistory(
      history.id,
      HistoryUniqueKey.create(history.siteId, history.importDate),
      TrendArticleList.create(history.trendArticleList),
    );
  }

  // Zennからのレスポンスを元に、TrendHistoryを生成する
  static createFromZennResponse(
    baseDateTime: BaseDateTime,
    response: ZennArticle[],
  ): TrendHistory {
    const newZennArticles: ZennArticle[] = response.filter(
      (trend: { publishedAt: string }) => {
        return baseDateTime.isSameOrBefore(trend.publishedAt, 1);
      },
    );

    const newTrendArticles = newZennArticles.map((trend: ZennArticle) => {
      return {
        id: undefined,
        trendHistoryId: undefined,
        articleId: trend.id,
        title: trend.title,
        url: trend.path,
      };
    });

    return TrendHistory.create({
      id: undefined,
      siteId: SiteValue.zennSiteId(),
      importDate: baseDateTime.toDate(),
      trendArticleList: newTrendArticles,
    });
  }

  // Qiitaからのレスポンスを元に、TrendHistoryを生成する
  static createFromQiitaResponse(
    baseDateTime: BaseDateTime,
    response: QiitaTrendFeed,
  ): TrendHistory {
    const newTrendList = response.feed.entry.filter(
      (qiitaArticle: QiitaArticle) => {
        return baseDateTime.isSameOrBefore(qiitaArticle.published._text, 1);
      },
    );

    const trendArticles: ITrendArticle[] = newTrendList.map(
      (qiitaArticle: QiitaArticle) => {
        const articleId = Number(
          qiitaArticle.id._text.match(/PublicArticle\/(\d+)/)[1],
        );

        return {
          id: undefined,
          trendHistoryId: undefined,
          articleId,
          title: qiitaArticle.title._text,
          url: qiitaArticle.link._attributes.href,
        };
      },
    );

    return TrendHistory.create({
      id: undefined,
      siteId: SiteValue.qiitaSiteId(),
      importDate: baseDateTime.toDate(),
      trendArticleList: trendArticles,
    });
  }

  toObject(): ITrendHistory {
    return {
      id: this.id,
      siteId: this.uniqueKey.siteId,
      importDate: this.uniqueKey.importDate,
      trendArticleList: this.trendArticleList.toObject(),
    };
  }
}
