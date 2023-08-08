import * as dayjs from 'dayjs';
import { Dayjs as _Dayjs } from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');
dayjs.tz.setDefault('Asia/Tokyo');

export const day = dayjs;
export type Dayjs = _Dayjs;
