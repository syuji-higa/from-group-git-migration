# From Group Git Migration
以下のルールによるリポジトリの移行
```
git@{ドメイン}:{グループ}/{リポジトリ}.git
```
↓
```
git@{ドメイン}:{ユーザ}/{グループ}--{リポジトリ}.git
```

## 設定
`app/config.json`
```json
{
  "repoDomain": "github.com",  // 移行先リポジトリのドメイン
  "repoUser"  : "sample",  // 移行先リポジトリのユーザ
  "destRoot"  : "/Users/user/git-migration",  // 一時保存ローカルディレクトリ
  "repoJson"  : "data/repositorys.json"  // 移行元リポジトリのデータ
}
```

## 移行元データ
`data/repositorys.json` に配列で URL を記述
```json
["リポジトリ1", "リポジトリ2", "リポジトリ3"]
```

## 実行
```bash
$ node app/main.js
```
※ 先に移行元リポジトリの用意が必要
