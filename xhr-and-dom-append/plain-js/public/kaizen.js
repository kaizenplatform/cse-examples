"use strict";

// カスタマーのサイトで実行されるので global scope を汚染させない
(function () {
  // business logics
  // Kaizen Web Api からコンテンツを取得
  var loadPlaces = function () {
    return new Promise(function (resolve, reject) {
      var url =
        "https://storage.googleapis.com/kaizen-cse-public/cse-examples/xhr-and-dom-append/plain-js/kaizen-web-api/places.json";

      // API error response パターン
      //var url =
      //  "https://storage.googleapis.com/kaizen-cse-public/cse-examples/xhr-and-dom-append/plain-js/kaizen-web-api/places-fail.json";

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
    console.log(places);
  };

  // main logic
  loadPlaces()
    .then(render)
    .catch(function (e) {
      console.error("reject: " + e);
    });
})();
