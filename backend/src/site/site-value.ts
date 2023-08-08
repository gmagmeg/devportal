import { SiteId } from './site-value-type';

export class SiteValue {
  static fromNumberToSiteId(siteId: number): SiteId {
    const siteIdNumber = Number(siteId);
    switch (siteIdNumber) {
      case 1:
      case 2:
        return siteIdNumber;
      default:
        throw new Error(`無効なサイトのIDです。siteId: ${siteId}`);
    }
  }

  static fromNameToId(siteName: string): SiteId {
    switch (siteName) {
      case 'Zenn':
      case 'zenn':
        return SiteValue.zennSiteId();
      case 'qiita':
      case 'Qiita':
        return SiteValue.qiitaSiteId();
      default:
        throw new Error(`無効なサイト名です。siteName: ${siteName}`);
    }
  }

  static getZennTrendApiUrl(): string {
    return 'https://zenn-api.vercel.app/api/trendTech';
  }

  static getQiitaTrendApiUrl(): string {
    return 'https://qiita.com/popular-items/feed';
  }

  static zennSiteId(): SiteId {
    return 1;
  }

  static qiitaSiteId(): SiteId {
    return 2;
  }
}
