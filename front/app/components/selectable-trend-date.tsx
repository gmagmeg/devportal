import { SiteName } from '@/type/trend-article-type'
import { FC, ChangeEvent } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'

export const SelectableTrendDate: FC<{
  onChangeDate: (value: string) => void
  siteName: SiteName
  selectDateList: string[]
}> = ({ onChangeDate, siteName, selectDateList }) => {
  /**
   * 日付のセレクトボックスが変更されたときの処理
   */
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChangeDate(event.target.value)
  }

  return (
    <div className='flex place-items-start mt-1 mb-2'>
      <label htmlFor={`hs-select-label${siteName}`} className='block font-medium mb-2'>
        <AiOutlineCalendar className='text-4xl mr-1' />
      </label>

      <div className='relative'>
        <select
          onChange={handleSelectChange}
          id={`hs-select-label${siteName}`}
          className='py-2 px-2 block border-gray-500 rounded-md  focus:border-blue-500 focus:ring-blue-500 border-2'
        >
          {selectDateList.map((date: string) => {
            return (
              <option key={date} value={date}>
                {date}の新着トレンド
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
