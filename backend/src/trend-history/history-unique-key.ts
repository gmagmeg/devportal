import { SiteId } from '@src/site/site-value-type';
import { ITrendHistory } from './trend-history-type';
import { SiteValue } from '@src/site/site-value';
import { BaseDateTime } from '@src/date/base-date-time';

export class HistoryUniqueKey {
  private constructor(
    public readonly siteId: SiteId,
    public readonly importDate: ITrendHistory['importDate'],
  ) {}

  static createFromPrimitive(
    siteId: number,
    baseDateTime: BaseDateTime,
  ): HistoryUniqueKey {
    return HistoryUniqueKey.create(
      SiteValue.fromNumberToSiteId(siteId),
      baseDateTime.toDate(),
    );
  }

  static create(
    siteId: ITrendHistory['siteId'],
    importDate: ITrendHistory['importDate'],
  ): HistoryUniqueKey {
    return new HistoryUniqueKey(siteId, importDate);
  }
}
