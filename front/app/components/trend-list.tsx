import { FC } from 'react'
import { TrendItem } from '@components/trend-item'
import { TrendArticle, DailyTrendArticle, SiteName } from '@type/trend-article-type'
import { dateFormat } from '@/util/dayjs'

export const TrendList: FC<DailyTrendArticle & { siteName: SiteName }> = ({
  importDate,
  trendArticleList,
  siteName,
}) => {
  const formatImportDate = dateFormat(importDate, 'YYYY年M月D日')

  let titleColor = siteName === 'zenn' ? 'bg-blue-500' : 'bg-green-500'
  titleColor += ' text-white font-bold p-1 pl-2'

  return (
    <>
      <h3 className={titleColor}>{formatImportDate}</h3>
      <ol className='bg-white pr-4 flex-grow border-t-2'>
        {trendArticleList.map((dailyTrend: TrendArticle, index) => {
          return (
            <TrendItem
              key={dailyTrend.id}
              id={dailyTrend.id}
              title={dailyTrend.title}
              url={dailyTrend.url}
              siteName={siteName}
              index={index}
            />
          )
        })}
      </ol>
    </>
  )
}
