'use strict';

(function () {
  var photos = [];

  var buttons = document.getElementsByClassName('img-filters__button');
  var buttonPopular = document.querySelector('#filter-popular');
  var buttonNew = document.querySelector('#filter-new');
  var buttonDiscussed = document.querySelector('#filter-discussed');

  function sortNewHandler() {
    window.data(
        photos
        .slice()
        .sort(function () {
          return 0.5 - Math.random();
        })
        .splice(0, 10)
    );
  }

  buttonNew.addEventListener('click', sortNewHandler);

  function sortDiscussedHandler() {
    window.data(
        photos.slice().sort(function (left, right) {
          return right.comments.length - left.comments.length;
        })
    );
  }

  buttonDiscussed.addEventListener('click', sortDiscussedHandler);

  // Получает массив фото с сервера
  function successHandler(data) {
    photos = data;
    window.data(photos);
  }

  buttonPopular.addEventListener('click', function () {
    window.data(photos);
  });

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = toggleClassButtons;
  }

  function toggleClassButtons(evt) {
    var el = evt.target;
    if (el.className.indexOf('img-filters__button--active') !== -1) {
      el.className = el.className.replace(' img-filters__button--active', '');
    } else {
      el.className += ' img-filters__button--active';
    }
  }
  window.load(successHandler);
})();
