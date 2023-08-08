import { WeeklyTrendArticle } from '@type/trend-article-type'
import { BASE_URL } from '@/util/base-config'
import { day } from '@/util/dayjs'
import { SiteName } from '@type/trend-article-type'

export const fetchWeeklyTrend = async (siteName: SiteName): Promise<WeeklyTrendArticle> => {
  const requestDate = day().add(1, 'day').format('YYYY-MM-DD')

  try {
    const res = await fetch(`${BASE_URL}trend-history/${requestDate}/${siteName}`)
    const data: { response: WeeklyTrendArticle } = await res.json()
    return data.response
  } catch (error) {
    throw new Error('Failed to fetch API')
  }
}
