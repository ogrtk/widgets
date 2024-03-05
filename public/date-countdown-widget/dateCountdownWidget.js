/**
 *
 * あとn日 残日数メッセージ表示ウィジェット組み込み版 v1.0
 * - v1.0 2024/03/05
 *
 **/

(function () {
  "use strict";

  const script = document.querySelectorAll('[data-widget-script="true"]')[0];
  const placeholderIds = script.dataset.placeholderIds
    .split(",")
    .filter((item) => item)
    .map((item) => item.trim());
  placeholderIds.forEach((placeholderId) => {
    setWidget(placeholderId);
  });

  /**
   * プレースホルダにウィジェットを設定
   */
  function setWidget(placeholderId) {
    // プレースホルダからパラメータを取得し、非表示にする
    const placeholder = document.getElementById(placeholderId);
    const today = placeholder.dataset.today;
    const targetDate = placeholder.dataset.targetDate;
    const title = placeholder.dataset.title;
    const preDescription = placeholder.dataset.preDescription;
    const preCount = placeholder.dataset.preCount;
    const postCount = placeholder.dataset.postCount;
    const postDescription = placeholder.dataset.postDescription;
    const hideAt = Number(placeholder.dataset.hideAt);
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
      today,
      targetDate,
      title,
      preDescription,
      preCount,
      postCount,
      postDescription,
      hideAt
    );

    // iframe内htmlとしてwidgetを設定
    let doc = iframe.contentWindow.document;
    doc.open();
    doc.write(widget);
    doc.head.appendChild(document.getElementById(iframeInnerstylesId));
    doc.close();
  }

  /**
   * widgetの内容
   **/
  function constructWidget(
    today,
    targetDate,
    title,
    preDescription,
    preCount,
    postCount,
    postDescription,
    hideAt
  ) {
    let calcuratedCount = ((todayStr, targetDateStr) => {
      // todayの値が設定されている場合は、その日とする（テスト用）
      let today = todayStr ? new Date(todayStr) : new Date();
      today.setHours(0, 0, 0, 0);
      const targetDate = new Date(targetDateStr);
      targetDate.setHours(0, 0, 0, 0);
      return (targetDate - today) / 86400000;
    })(today, targetDate);

    // 文章を接続して作成
    let titleEl = "<span class='title'>" + (title ?? "") + "</span>";
    let preDescEl =
      "<span class='pre-description'>" + (preDescription ?? "") + "</span>";
    let preCountEl = "<span class='pre-count'>" + (preCount ?? "") + "</span>";
    let calculatedCountEl =
      "<span class='calcurated-count'>" + calcuratedCount + "</span>";
    let postCountEl =
      "<span class='post-count'>" + (postCount ?? "") + "</span>";
    let postDescEl =
      "<span class='post-description'>" + (postDescription ?? "") + "</span>";

    // 外枠に入れて返す
    let returnStr =
      "<div class='container'" +
      // hideAt以下の場合、非表示とする
      (hideAt >= calcuratedCount ? " style='display:none'" : "") +
      ">" +
      titleEl +
      "<div class='description'>" +
      preDescEl +
      preCountEl +
      calculatedCountEl +
      postCountEl +
      postDescEl +
      "</div>" +
      "</div>";

    return returnStr;
  }
})();
