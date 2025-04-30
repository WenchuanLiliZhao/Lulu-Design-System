interface SiteInfoType {
  title: string;
  description: string;
  currentVersion: string;
  buildDate: Date;
  expiryDate: Date; // 到期时间
}

export const CDD_SiteInfo: SiteInfoType = {
  title: '产品版本',
  description: 'v4.12.0',
  currentVersion: 'v4.12.0',
  buildDate: new Date('2025-04-24T00:00:00'), // 构建时间
  expiryDate: new Date('2025-04-26 11:06:48') // 到期时间
};