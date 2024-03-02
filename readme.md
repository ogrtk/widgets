# kintone カスタマイズリソース配置用のローカル Web サーバ

## 概要

- 用途

  - js カスタマイズ等の作成時に、開発端末上で js ファイル等を Web 配信、kintone アプリ/formbride/kViewer 用の js カスタマイズとして参照させることで、修正の都度、js ファイルをアップデートする必要がなく、効率的に開発作業が行えるようになります。

- 構成イメージ

  - ローカル Web サーバがあると、開発端末内で編集した js ファイルをそのまま動作させることが可能

    ```mermaid
    graph LR
    server[kintone等]
    subgraph devsv[ローカルWebサーバ]
      js[jsファイル]
    end
    subgraph client[開発端末]
      browser[ブラウザ]
      devsv
    end
    browser --> |1.リクエスト|server
    server -->|2.html等を返す| browser
    browser -->|3.javascript取得|js
    js-.-comment[修正がそのまま反映]

    style comment color:blue,stroke:blue
    ```

  - ローカル Web サーバが無いと、都度の js ファイルアップロードが必要となる

    ```mermaid
    graph LR
    server[kintone等]
    js[jsファイル]
    subgraph client[端末]
      jslocal[jsファイル]
      browser[ブラウザ]
    end
    browser --> |1.リクエスト|server
    server -->|2.html等を返す| browser
    jslocal-->|0.事前にアップロード|js
    browser --> |3.javascript取得|js
    js-.-comment[都度uploadが必要]
    style comment color:red,fill:beige,stroke:orange
    ```

## 利用手順

- ローカル Web サーバ

  - src ディレクトリを公開する設定としているので、js ファイル等の開発リソースを src ディレクトリ配下に設置してください
  - `npm run dev` で、ローカルの Web サーバを起動

    ```shell
    ebbing58@penguin:~/workspace/kintone$ npm run dev

    > kintone@1.0.0 dev
    > npx nodemon serve.js

    [nodemon] 2.0.15
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node serve.js`
    開始... KINTONE jsカスタマイズ配置用開発サーバ in port 3000
    ```

- kintone などからの参照
  - 次のように指定 `http://127.0.0.1:3000/src/(ファイル名)`
