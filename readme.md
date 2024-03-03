# Widget 開発用のローカル Web サーバ

## 概要

個人的に開発した各種 widget を

## 開発環境

- `devcontainer`を用いています
- Widget 開発用のローカル Web サーバを`express`で立てられるようにしています。
- https で動作させるための証明書は自身で用意してください

### 利用手順

- 開発コンテナで開いてください

- npm モジュールをインストール

  ```shell
  npm install
  ```

- public ディレクトリで静的ファイルを公開する設定としているので、js ファイル等の開発リソースを配下に設置してください

- ローカルの Web サーバを起動

  ```shell
  npm run dev
  ```

- ブラウザからの参照
  - `https://localhost:3000/static/(public以下の配置先パス)`
