'use strict';

(function () {
  var photos = [];

  var buttonNew = document.querySelector('#filter-new');

  function sortNew() {
    window.data(
        photos.sort(function () {
          return 0.5 - Math.random();
        })
    );
  }

  buttonNew.addEventListener('click', function () {
    // successHandler();
  });

  function successHandler(data) {
    photos = data;
    window.data(photos);
  }

  var URL = 'https://js.dump.academy/kekstagram/data';
  window.load(URL, successHandler);
})();
