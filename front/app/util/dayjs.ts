import dayjs from 'dayjs'
import { Dayjs as _Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ja')
dayjs.tz.setDefault('Asia/Tokyo')

export const day = dayjs
export type Dayjs = _Dayjs

export const dateFormat = (date: string, format = 'YYYY-M-D'): string => {
  return day(date).tz('Asia/Tokyo').format(format)
}
