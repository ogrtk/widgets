# calc-date-widget

## 概要

- n 日後の日付を計算し、文章に組み込んで表示するウィジェットです

  - n 日後が土日にあたる場合を考慮してその翌日にすることができます
  - n 日後が祝日等のイレギュラーな日付にあたる場合を考慮してその翌日にすることができます。祝日等のイレギュラーな日付については設定が可能です
  - css を用いて、デザインの調整が可能です

- 使用例

  - [例 1(script 参照版)](https://ogrtk.github.io/widgets/public/calc-date-widget/examples/example1.html)
  - [例 2(script 参照版)](https://ogrtk.github.io/widgets/public/calc-date-widget/examples/example2.html)
  - [例 3(script 組み込み版)](https://ogrtk.github.io/widgets/public/calc-date-widget/examples/embedded.html)

## 使い方

- script 参照版とするか、script 組み込み版とするかを決めます

  - script 参照版
    - 簡素な記述で組み込むことができます
    - 作者は、github pages で script を公開しています。参照版では実行時にこの script を取得します。
    - 基本的に公開を停止するような予定はありませんが、保証もできません。
  - script 組み込み版
    - script ごとまるまるコピーして使います
    - 作者が script の公開を終了しても影響を受けません。

- html へウィジェット用の配置場所を用意

  - div 要素としてプレースホルダとなる要素を用意します

    ```html
    <!--
      プレースホルダ。実行時には非表示となる
      data-xxxxx の属性を編集し、必要なパラメータを設定する
      ・data-today : 現在日として扱う日付をyyyy-mm-dd形式で設定する。基本的に設定しなくて良い（空にする）。動作確認用。
      ・data-days-after : 現在日＋ここで設定する日数後の日付を計算する。マイナスも設定可。
      ・data-skip-weekends : trueに設定した場合、計算後の日付が土日にあたる場合、次の月曜日まで進めた日付とする
      ・data-holidays : 祝日リスト。祝日などをyyyy-mm-dd形式、カンマ区切りで複数設定する。計算後の日付がこのリストに含まれる場合、翌日に進める。
      ・data-title : タイトル
      ・data-pre-description : 表示する文章の前部分
      ・data-pre-description : 表示する文章の後部分
      ・data-date-format : 日付の表示形式。full…yyyy年m月d日と曜日、long…yyyy年m月d日、short…yyyy/mm/dd
      ・data-iframe-classname : widget配置するiflameのスタイルを指定するCSSクラス名　※他html要素との重複がなければ変更不要
      ・data-iframe-innerstyles-id : widget内のスタイルを定義するstyle要素のid　※他html要素との重複がなければ変更不要
      ※次のように文章が表示される
        表示する文章の前部分 + 計算結果の日付 + 表示する文章の後部分
    -->
    <div
      id="widgetPlaceholder"
      data-today="2024-03-04"
      data-days-after="5"
      data-skip-weekends="true"
      data-holidays="2024-01-01,2024-01-02,2024-01-03,2024-03-11,2024-03-12,2024-03-13,2024-03-14,2024-03-15"
      data-title="お知らせ"
      data-pre-description="この届け出は"
      data-post-description="以降に提出可能です。"
      data-date-format="full"
      data-iframe-classname="widget-iframe"
      data-iframe-innerstyles-id="innerStyles"
    ></div>
    ```

  - 適用するスタイルを用意します

    - なお、example2 の内容は、[こちらのサイト](https://saruwakakun.com/html-css/reference/box#google_vignette)を参考にしたものとなっています

    ```html
    <style id="innerStyles">
      /* 
        文字部分のスタイルをここで設定します
        style要素のIDは、data-iframe-innerstyles-idと一致するようにしてください 
    
        widgetは次のようなhtmlで構成されます
        <div class="container">
          <span class="title">title</span>
          <div class="description">
            <span class="pre-description">predescription</span>
            <span class="calcurated-date">日付</span>
            <span class="post-description">postdescription</span>
          </div>
        </div> 
      */

      /* 全体枠 */
      .container {
        position: relative;
        margin: 2em 0;
        padding: 0.5em 1em;
        border: solid 3px #62c1ce;
      }
      /* タイトル */
      .title {
        position: absolute;
        display: inline-block;
        top: -27px;
        left: -3px;
        padding: 0 9px;
        height: 25px;
        line-height: 25px;
        font-size: 17px;
        background: #62c1ce;
        color: #ffffff;
        font-weight: bold;
        border-radius: 5px 5px 0 0;
      }
      /* 文章全体 */
      .description {
        text-align: center;
        margin: 0;
        padding: 0;
      }
      /* 前後の文章 */
      .pre-description,
      .post-description {
        font-size: 1em;
        color: gray;
      }
      /* 日付 */
      .calcurated-date {
        font-size: 1.5em;
        font-weight: 800;
        color: red;
        padding: 0px 10px 0px 10px;
      }
    </style>

    <style>
      /* 枠部分のスタイルをここで設定します
        クラス名は、data-iframe-classnameと一致するようにしてください */

      /* 枠となるiframe */
      .widget-iframe {
        border: solid 0px;
        border-color: gray;
        padding: 0px;
        width: 100%;
        height: 0px; /*heightは必ず0pxにしておくこと（内容によって自動調整されますが、高さがないと150pxになってしまうため）*/
      }
    </style>
    ```

  - script タグを用意します

    - script 参照版の場合

      ```html
      <!-- 
        設定の反映処理 
        ・必ずdata-widget-script="true"としてください
        ・data-placeholder-idにはプレースホルダ要素のidを設定してください
      -->
      <script
        src="https://ogrtk.github.io/widgets/public/calc-date-widget/calcDateWidget.js"
        data-widget-script="true"
        data-placeholder-id="widgetPlaceholder"
      ></script>
      ```

    - script 組み込み版の場合

      ```html
      <!--
        設定の反映処理
        ・必ずdata-widget-script="true"としてください
        ・data-placeholder-idにはプレースホルダ要素のidを設定してください
      -->
      <script data-widget-script="true" data-placeholder-id="widgetPlaceholder">
        /**
         *  注意 ここから先は原則として変更しないこと
         */

        /**
         * n日後 日付計算結果メッセージ表示ウィジェット用スクリプト v1.0
         * - v1.0 2024/03/03
         */

        (function () {
          "use strict";

          const script = document.querySelectorAll(
            '[data-widget-script="true"]'
          )[0];
          const placeholderId = script.dataset.placeholderId;

          // プレースホルダからパラメータを取得し、非表示にする
          const placeholder = document.getElementById(placeholderId);
          const holidays = placeholder.dataset.holidays;
          const today = placeholder.dataset.today;
          const daysAfter = Number(placeholder.dataset.daysAfter);
          const skipWeekends = placeholder.dataset.skipWeekends === "true";
          const dateFormat = placeholder.dataset.dateFormat;
          const title = placeholder.dataset.title;
          const preDescription = placeholder.dataset.preDescription;
          const postDescription = placeholder.dataset.postDescription;
          const iframeClassname = placeholder.dataset.iframeClassname;
          const iframeInnerstylesId = placeholder.dataset.iframeInnerstylesId;
          placeholder.style.display = "none";

          // iframeを作成
          let iframe = document.createElement("iframe");
          iframe.scrolling = "no";
          iframe.classList.add(iframeClassname);
          iframe.addEventListener("load", (e) => {
            // 高さ自動調節
            e.currentTarget.style.height =
              e.currentTarget.contentWindow.document.body.scrollHeight + "px";
          });

          // iframeを設置
          placeholder.parentNode.insertBefore(iframe, placeholder);

          // widgetの中身を作成
          let widget = constructWidget(
            holidays,
            today,
            daysAfter,
            skipWeekends,
            title,
            preDescription,
            postDescription,
            dateFormat
          );

          // iframe内htmlとしてwidgetを設定
          let doc = iframe.contentWindow.document;
          doc.open();
          doc.write(widget);
          doc.head.appendChild(document.getElementById(iframeInnerstylesId));
          doc.close();

          /**
           * widgetの内容
           **/
          function constructWidget(
            holidays,
            today,
            daysAfter,
            skipWeekends,
            title,
            preDescription,
            postDescription,
            datestyle
          ) {
            let calcuratedDate = ((
              today,
              holidays,
              daysAfter,
              skipWeekends,
              dateFormat
            ) => {
              // 祝日リストをカンマで分割・空白を除去し、配列に格納
              let holidaysArray = holidays
                .split(",")
                .filter((item) => item)
                .map((item) => item.trim());
              // todayの値が設定されている場合は、その日とする（テスト用）
              let calcurated = today ? new Date(today) : new Date();
              // daysAfter後の日付を計算
              calcurated.setDate(calcurated.getDate() + daysAfter);

              // 土日や祝日等の考慮
              while (true) {
                // 土日または祝日等に該当し、日付を進めた場合、再度評価するためフラグを設定する
                let proceedingHappened = false;

                // 土日をスキップする
                if (skipWeekends) {
                  while (true) {
                    if (
                      calcurated.getDay() === 0 ||
                      calcurated.getDay() === 6
                    ) {
                      calcurated.setDate(calcurated.getDate() + 1);
                      proceedingHappened = true;
                    } else {
                      break;
                    }
                  }
                }
                // 祝日リストに含まれていれば翌日にする（繰り返して、祝日リストに含まれない日まで実行）
                while (true) {
                  let tmpDateStr = calcurated.toISOString().substring(0, 10);
                  if (holidaysArray.includes(tmpDateStr)) {
                    calcurated.setDate(calcurated.getDate() + 1);
                    proceedingHappened = true;
                  } else {
                    break;
                  }
                }
                // 土日または祝日等に該当しなかった場合は評価を終了
                if (!proceedingHappened) {
                  break;
                }
              }

              // 日付形式を指定し、文字列で返す
              return new Intl.DateTimeFormat("ja-JP", {
                dateStyle: dateFormat,
                timeZone: "Asia/Tokyo",
              }).format(calcurated);
            })(today, holidays, daysAfter, skipWeekends, datestyle);

            // 文章を接続して作成
            let titleEl = "<span class='title'>" + (title ?? "") + "</span>";
            let preDescEl =
              "<span class='pre-description'>" +
              (preDescription ?? "") +
              "</span>";
            let calculatedDateEl =
              "<span class='calcurated-date'>" + calcuratedDate + "</span>";
            let postDescEl =
              "<span class='post-description'>" +
              (postDescription ?? "") +
              "</span>";

            // 外枠に入れて返す
            let returnStr =
              "<div class='container'>" +
              titleEl +
              "<div class='description'>" +
              preDescEl +
              calculatedDateEl +
              postDescEl +
              "</div>" +
              "</div>";

            return returnStr;
          }
        })();
      </script>
      ```
