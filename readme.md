# Widgets

## 概要

個人的に開発した各種 widget を配置しています。
`public`以下にあるため、使い方はそれぞれを参照。

## widget 一覧

| widget 名                                                                                        | 概要                                                                         |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [calc-date-widget](https://github.com/ogrtk/widgets/tree/main/public/calc-date-widget)           | n 日後の日付を計算し、文章として表示する。土日やカウントしない日付を設定可能 |
| [date-countdown-widget](https://github.com/ogrtk/widgets/tree/main/public/date-countdown-widget) | 指定する対象日付までの日数をカウントし、文章として表示する                   |

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
