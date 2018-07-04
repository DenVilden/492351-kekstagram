'use strict';

(function () {
  var photos = [];

  var buttonNew = document.querySelector('#filter-new');

  function sortNew() {
    window.data(
        photos.slice(0, 10).sort(function () {
          return 0.5 - Math.random();
        })
    );
  }

  function sortMostComments() {
    window.data(
        photos.sort(function (left, right) {
          return right.comments.length - left.comments.length;
        })
    );
  }

  buttonNew.addEventListener('click', function () {
    //
  });

  function successHandler(data) {
    photos = data;
    // sortNew();
    sortMostComments();
    // window.data(photos);
  }

  var URL = 'https://js.dump.academy/kekstagram/data';
  window.load(URL, successHandler);
})();
