/**
 * n日後 日付計算結果メッセージ表示ウィジェット用スクリプト v1.0
 * - v1.0 2024/03/03
 */

(function () {
  "use strict";

  // プレースホルダからパラメータを取得し、非表示にする
  let placeholder = document.getElementById("widget-placeholder");
  let holidays = placeholder.dataset.holidays;
  let today = placeholder.dataset.today;
  let daysAfter = Number(placeholder.dataset.daysAfter);
  let skipWeekends = placeholder.dataset.skipWeekends === "true";
  let dateFormat = placeholder.dataset.dateFormat;
  let preDescription = placeholder.dataset.preDescription;
  let postDescription = placeholder.dataset.postDescription;
  let iframeClassname = placeholder.dataset.iframeClassname;
  let iframeInnerstylesId = placeholder.dataset.iframeInnerstylesId;
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
            if (calcurated.getDay() === 0 || calcurated.getDay() === 6) {
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
    let preDescEl =
      "<span class='pre-description'>" + preDescription ?? "" + "</span>";
    let postDescEl =
      "<span class='post-description'>" + postDescription ?? "" + "</span>";
    let calculatedDateEl =
      "<span class='calcurated-date'>" + calcuratedDate + "</span>";

    // 外枠に入れて返す
    return (
      "<div class='parent-container'>" +
      preDescEl +
      calculatedDateEl +
      postDescEl +
      "</div>"
    );
  }
})();
