# 概要
日々更新されるZennとQiitaのトレンドを一箇所で簡単にチェックできるようにすることを目的としています。  
技術トレンドに素早くアクセスできることで、開発者が最新の技術情報を効率的にキャッチアップできるよう支援します。

# 主な利用技術
- TypeScript
- Nest.js
- Next.js

# 工夫ポイント
## ストリーミングへの挑戦
非同期処理において、ストリーミングに挑戦しました。  
そこでPromiseとストリーミングの根本的な違いについて理解を得られました。  
**Promise**
Promiseは、複数の非同期リクエストを一つの結果として統合し、その結果が利用可能になるまで待機するので、すべての処理が完了するまで結果を待つことになります。  
つまり１つの処理の失敗が全体の処理の失敗として扱われ、失敗した処理の分別が困難です。  

**ストリーミング**  
ストリーミングは個々のデータを段階的に処理して、リクエストごとに処理を完結させるため、  
全てのデータを待つ必要がなく、効率的なデータ処理が可能になります。  
つまり１つの処理が失敗したことを切り分けることが出来、  
とくに複数のサービスと連携するマイクロサービスにおいて役立つことが分かりました。