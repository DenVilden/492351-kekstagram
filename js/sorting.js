'use strict';

(function () {
  var photos = [];

  var buttons = document.querySelectorAll('.img-filters__button');
  var form = document.querySelector('.img-filters__form');
  var buttonPopular = document.querySelector('#filter-popular');
  var buttonNew = document.querySelector('#filter-new');
  var buttonDiscussed = document.querySelector('#filter-discussed');

  function activeButtonHandler() {
    form.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList.contains('img-filters__button')) {
        // Удаляет active класс
        buttons.forEach(function (button) {
          button.classList.remove('img-filters__button--active');
          button.disabled = false;
        });
        // Добавляет active класс
        target.classList.add('img-filters__button--active');
        target.disabled = true;
      }
    });
  }
  activeButtonHandler();

  // Популярные
  function sortPopularHandler() {
    window.data(photos);
  }
  buttonPopular.addEventListener('click', function () {
    window.debounce(sortPopularHandler);
  });

  // Новые
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
  buttonNew.addEventListener('click', function () {
    window.debounce(sortNewHandler);
  });

  // Обсуждаемые
  function sortDiscussedHandler() {
    window.data(
        photos.slice().sort(function (left, right) {
          return right.comments.length - left.comments.length;
        })
    );
  }
  buttonDiscussed.addEventListener('click', function () {
    window.debounce(sortDiscussedHandler);
  });

  // Получает массив фото с сервера
  function successHandler(data) {
    photos = data;
    window.data(photos);
  }

  window.load(successHandler);
})();
