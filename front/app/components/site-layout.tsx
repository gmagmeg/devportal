import { FC } from 'react'
import { WeeklyTrendArticle as TypeWeeklyTrendArticle, SiteName } from '@type/trend-article-type'
import { SiteLogo } from '@components/site-logo'
import { WeeklyTrendArticle } from '@components/weekly-trend-article'
import { fetchWeeklyTrend } from '@/requests/trend-history'

export const SiteLayout: FC<{
  siteName: SiteName
}> = async ({ siteName }) => {
  const weeklyTrendArticle: TypeWeeklyTrendArticle = await fetchWeeklyTrend(siteName)
  return (
    <div className='sm:h-90vh h-45vh sm:w-1/2 flex flex-col sm:pr-2 sm:pl-2 mb-2'>
      <SiteLogo siteName={siteName} />
      <WeeklyTrendArticle weeklyTrendArticle={weeklyTrendArticle} siteName={siteName} />
    </div>
  )
}
