import { Id } from '@src/util/util-type';

import { TrendHistory as TrendHistoryTable } from '@prisma/client';
import { ITrendArticle } from './trend-article-type';
import { TrendArticleList } from './trend-article-list';
import { SiteId } from '@src/site/site-value-type';

export type TrendHistoryId = Id | undefined;

export interface ITrendHistory {
  id?: TrendHistoryId;
  siteId: SiteId;
  importDate: TrendHistoryTable['importDate'];
  trendArticleList: ITrendArticle[];
}

export interface IHistoryUniqueKey {
  siteId: ITrendHistory['siteId'];
  importDate: ITrendHistory['importDate'];
}

export type HistoryDetail = {
  historyId: TrendHistoryId;
  articleList: TrendArticleList;
};
