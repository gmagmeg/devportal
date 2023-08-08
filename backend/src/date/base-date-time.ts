import { day, Dayjs } from '@src/util/date';

/**
 * 基準日を扱うクラス
 */
export class BaseDateTime {
  private constructor(private readonly baseDateTime: Dayjs) {}

  // staticメソッドの中で使いたい場合もあるため、あえてメソッド化している
  private static getDateFormat(): string {
    return 'YYYY-MM-DDT00:00:00';
  }

  // 00:00:00に変換した日付を返す
  private static baseFormat(date: string): Dayjs {
    return day(day(date).format(BaseDateTime.getDateFormat()));
  }

  static create(date: string): BaseDateTime {
    if (date === 'now' || date === '') {
      date = day().format(BaseDateTime.getDateFormat());
    }

    return new BaseDateTime(BaseDateTime.baseFormat(date));
  }

  // dayjs.toDay()を利用すると日付がずれるので、あえて利用しない
  toDate(): Date {
    return new Date(this.baseDateTime.format(BaseDateTime.getDateFormat()));
  }

  // 引数の日付が基準日以降かどうかを判定する
  isSameOrBefore(diffTime: string, subDay = 0): boolean {
    const subDateTime = BaseDateTime.baseFormat(
      this.baseDateTime.subtract(subDay, 'day').toString(),
    );
    return subDateTime.isSame(diffTime) || subDateTime.isBefore(diffTime);
  }

  oneWeekAgo(): BaseDateTime {
    return BaseDateTime.create(this.baseDateTime.subtract(7, 'day').toString());
  }
}
