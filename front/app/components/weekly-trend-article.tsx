'use client'

import { FC, useState } from 'react'
import { TrendList } from '@components/trend-list'
import {
  DailyTrendArticle,
  SiteName,
  WeeklyTrendArticle as TypeWeeklyTrendArticle,
} from '@/type/trend-article-type'
import { SelectableTrendDate } from '@components/selectable-trend-date'
import { dateFormat } from '@/util/dayjs'

export const WeeklyTrendArticle: FC<{
  weeklyTrendArticle: TypeWeeklyTrendArticle
  siteName: SiteName
}> = ({ weeklyTrendArticle, siteName }) => {
  const [selectedweeklyTrendArticle, setSelectedweeklyTrendArticle] =
    useState<TypeWeeklyTrendArticle>(weeklyTrendArticle)

  /**
   * 選択された日付に紐づく記事を表示する
   */
  const handleChangeDate = (date: string) => {
    const selectedweeklyTrendArticle: TypeWeeklyTrendArticle = weeklyTrendArticle.filter(
      (dailyTrendArticle: DailyTrendArticle) => {
        return dateFormat(dailyTrendArticle.importDate) === date
      },
    )

    setSelectedweeklyTrendArticle(selectedweeklyTrendArticle)
  }

  /**
   * 日付のセレクトボックスに表示する日付のリスト
   */
  const selectDateList: string[] = weeklyTrendArticle.map(
    (dailyTrendArticle: DailyTrendArticle) => {
      return dateFormat(dailyTrendArticle.importDate)
    },
  )

  return (
    <>
      <SelectableTrendDate
        onChangeDate={handleChangeDate}
        siteName={siteName}
        selectDateList={selectDateList}
      />

      <div className='overflow-y-auto'>
        {selectedweeklyTrendArticle.map((dailyTrendArticle) => {
          return (
            <TrendList
              key={dailyTrendArticle.importDate}
              importDate={dailyTrendArticle.importDate}
              trendArticleList={dailyTrendArticle.trendArticleList}
              siteName={siteName}
            />
          )
        })}
      </div>
    </>
  )
}
