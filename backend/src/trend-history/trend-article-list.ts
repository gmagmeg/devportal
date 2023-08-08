import { ITrendArticle, TrendArticleMap } from './trend-article-type';
import { MapComvert } from '@src/util/map-convert';

export class TrendArticleList {
  private constructor(
    public readonly list: Map<ITrendArticle['articleId'], ITrendArticle>,
  ) {}

  static create(articleList: ITrendArticle[]): TrendArticleList {
    const newMap: TrendArticleMap = articleList.map(
      (article: ITrendArticle) => {
        return [article.articleId, article];
      },
    );

    return new TrendArticleList(new Map(newMap));
  }

  toArray(): ITrendArticle[] {
    return [...this.list.values()];
  }

  toObject(): ITrendArticle[] {
    return MapComvert.toArrayValues(this.list).map((article: ITrendArticle) => {
      return article;
    });
  }
}
