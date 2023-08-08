import { Id } from '@src/util/util-type';
import { TrendArticle as TrendArticleTable } from '@prisma/client';

export interface ITrendArticle {
  id: Id;
  trendHistoryId: Id;
  articleId: TrendArticleTable['articleId'];
  title: TrendArticleTable['title'];
  url: TrendArticleTable['url'];
}

export type TrendArticleMap = [ITrendArticle['articleId'], ITrendArticle][];

export type ZennArticle = {
  id: number;
  postType: string;
  title: string;
  slug: string;
  commentsCount: number;
  likedCount: number;
  bodyLettersCount: number;
  articleType: string;
  emoji: string;
  isSuspendingPrivate: boolean;
  publishedAt: string;
  bodyUpdatedAt: string;
  sourceRepoUpdatedAt: null | string;
  pinned: boolean;
  path: string;
  user: {
    id: number;
    username: string;
    name: string;
    avatarSmallUrl: string;
  };
  publication: null;
};

export type QiitaTrendFeed = {
  feed: {
    entry: QiitaArticle[];
  };
};

export type QiitaArticle = {
  id: { _text: string };
  published: { _text: string };
  link: { _attributes: { href: string } };
  title: { _text: string };
};
