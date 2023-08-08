export type WeeklyTrendArticle = DailyTrendArticle[]

export type DailyTrendArticle = {
  // YYYY-MM-DDThh:mm:ss
  importDate: string
  trendArticleList: TrendArticle[]
}

export type TrendArticle = {
  id: number
  title: string
  url: string
}

export type SiteName = 'qiita' | 'zenn'
