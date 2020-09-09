"use strict";

// カスタマーのサイトで実行されるので global scope を汚染させない
(function () {
  // business logics
  // Kaizen Web API からコンテンツを取得
  var loadPlaces = function () {
    return new Promise(function (resolve, reject) {
      var url =
        "https://storage.googleapis.com/kaizen-cse-public/cse-examples/xhr-and-dom-append/plain-js/kaizen-web-api/places.json?20200910";

      // API error response パターン
      //var url =
      //  "https://storage.googleapis.com/kaizen-cse-public/cse-examples/xhr-and-dom-append/plain-js/kaizen-web-api/places-fail.json?20200910";

      $.get(url)
        .done(function (r) {
          console.log("xhr done", r);
          if (!r.success) return reject(r.error);
          resolve(r.places);
        })
        .fail(function () {
          reject("xhr failed");
        });
    });
  };

  // U/I を表示
  var render = function (places) {
    console.log("places", places);
    if (places.length === 0) return;

    _applyStyle();
    var $w = $(`<div class="inner-form kz"></div>`).insertAfter(".inner-form");

    $.each(places, function (i, p) {
      $(`
        <div class="kz-item">
          <div class="kz-image">
            <img src=${p.image} />
          </div>
          <div class="kz-desc">
            <div class="kz-name">
              <a href="${p.googleMap}" target="_blank">${p.name}</a>
            </div>
            <div class="kz-country">${p.country}</div>
          </div>
        </div>
      `).appendTo($w);
    });

    return places.length;
  };

  var _applyStyle = function () {
    var css = `
      .s01 form .inner-form.kz {
        margin-top: 20px;
      }

      .kz-item {
        width: 100%;
        clear: both;
        color: white;
      }

      .kz-name a {
        font-size: 1.2em;
        font-weight: bold;
        color: white;
      }

      .kz-image {
        float: left;
      }

      .kz-image img {
        width: 100px;
      }

      .kz-desc {
        float: left;
        margin-left: 10px;
        font-size: 0.9em;
      }

      @media screen and (max-width: 767px) {
        .s01 form .inner-form.kz {
          padding-bottom: 10px;
        }

        .kz-item {
          margin-bottom: 10px;
        }

        .kz-image img {
          width: 60px;
        }
      }
    `;

    var s = document.createElement("style");
    document.head.appendChild(s);
    if (s.styleSheet) s.styleSheet.cssText = css;
    else s.innerHTML = css;
  };

  var sendLog = function (placesCount) {
    console.log(`sendLog: ${placesCount} items displayed`);
    // 実際の計測ログ送信 code は省略。code image は以下:
    // kzs("trackCustomEvent", { action:"places-ui-displayed", items: placesCount });
  };

  // main logic
  Promise.resolve()
    .then(function () {
      console.log("kaizen.js run");
    })
    .then(loadPlaces)
    .then(render)
    .then(sendLog)
    .then(function () {
      console.log("kaizen.js done");
    })
    .catch(function (e) {
      console.error("reject: " + e);
    });
})();
