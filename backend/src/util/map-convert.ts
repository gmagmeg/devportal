/**
 * Mapオブジェクト関連のユーティリティ
 */

export class MapComvert {
  // Mapオブジェクトを配列に変換する
  static toArray<K, V>(map: Map<K, V>) {
    return [...map];
  }

  /**
   * Mapオブジェクトのキーを配列に変換する
   * 例：
   * new Map(
   *  ['2023-04-01', TrendArticle[]],
   *  ['2023-04-02', TrendArticle[]
   * ])
   * ↓
   * ['2023-04-01', '2023-04-02']
   */
  static toArrayKeys<K, V>(map: Map<K, V>): K[] {
    return [...map.keys()];
  }

  /**
   * Mapオブジェクトの値を配列に変換する
   * 例：
   * new Map(
   *  ['2023-04-01', 1],
   *  ['2023-04-02', 2]
   * ])
   * ↓
   * [1, 2]
   */
  static toArrayValues<K, V>(map: Map<K, V>): V[] {
    return [...map.values()];
  }

  /**
   * 配列を値に持つ、Mapオブジェクトの値を配列に変換する
   * 例：
   * new Map(
   *  ['2023-04-01', [1, 2, 3]],
   *  ['2023-04-02', [2, 3, 4]]
   * ])
   * ↓
   * 値が重複している場合は、上書きせずにそのまま重複した値を含めて返す
   * [1, 2, 3, 2, 3, 4]
   */
  static toArrayFlatValues<K, V>(map: Map<K, V[]>): V[] {
    return [...map.values()].flat();
  }

  static getFirstValue<V>(map: Map<string, V>): V | undefined {
    return map.values().next().value;
  }
}
