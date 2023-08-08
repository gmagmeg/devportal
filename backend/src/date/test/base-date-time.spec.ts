import { BaseDateTime } from '@src/date/base-date-time';

// writting base-date-time.spec.ts

describe('BaseDateTime', () => {
  describe('isSameOrBefore', () => {
    it('基準日が、与えられたYYYY-MM-DD形式の日付以前かどうかを判定する', () => {
      // Arrange
      const baseDateTime = BaseDateTime.create('now');

      // Act
      const resultYMD = baseDateTime.isSameOrBefore('2024-07-29');

      // Assert
      expect(resultYMD).toBe(true);
    });

    it('基準日が、与えられたYYYY-MM-DD HH:mm:ss形式の日付以前かどうかを判定する', () => {
      // Arrange
      const baseDateTime = BaseDateTime.create('2023-07-27');

      // Act
      const resultYMDHms = baseDateTime.isSameOrBefore('2023-07-27 11:11:00');

      // Assert
      expect(resultYMDHms).toBe(true);
    });

    it('基準日が、与えられたISO 8601format形式の日付以前かどうかを判定する', () => {
      // Arrange
      const baseDateTime = BaseDateTime.create('2023-07-27');

      // Act
      const resultISO = baseDateTime.isSameOrBefore(
        '2023-07-27T11:11:00.780+09:00',
      );

      // Assert
      expect(resultISO).toBe(true);
    });

    it('基準日を一日前に戻し、与えられたISO 8601format形式の日付以前かどうかを判定する', () => {
      // Arrange
      const baseDateTime = BaseDateTime.create('2023-07-28');

      // Act
      const resultISO = baseDateTime.isSameOrBefore(
        '2023-07-27T11:11:00.780+09:00',
        1,
      );

      // Assert
      expect(resultISO).toBe(true);
    });
  }),
    describe('toDate', () => {
      it('基準日をDate型に変換する', () => {
        // Arrange
        const baseDateTime = BaseDateTime.create('2023-07-28');

        // Act
        const result = baseDateTime.toDate();

        // Assert
        expect(result).toEqual(new Date('2023-07-28T00:00:00'));
      });
    }),
    describe('oneWeekAgo', () => {
      it('１週間前の日付を返す', () => {
        // Arrange
        const baseDateTime = BaseDateTime.create('2023-07-28');

        // Act
        const result = baseDateTime.oneWeekAgo().toDate();

        // Assert
        expect(result).toEqual(new Date('2023-07-21T00:00:00'));
      });
    });
});
