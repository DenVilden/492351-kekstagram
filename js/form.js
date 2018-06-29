'use strict';

(function () {

  var form = document.querySelector('.img-upload__form');
  var uploadOverlay = form.querySelector('.img-upload__overlay');
  var textHashtags = uploadOverlay.querySelector('.text__hashtags');


  // Проверка валидности хештагов
  textHashtags.addEventListener('input', function (evt) {
    var target = evt.target;
    var split = target.value.split(' '); // Формирует массив из хэштегов

    for (var i = 0; i < split.length; i++) {
      var hashtag = split[i];

      if (hashtag.indexOf('#') !== 0) {
        target.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
      } else if (hashtag.length < 2) {
        target.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
      } else if (hashtag.indexOf('#', 2) > 1) {
        target.setCustomValidity('Хэш-теги должны разделяться пробелами');
      } else if (window.funcs.haveDuplicates(split)) {
        target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      } else if (split.length > 5) {
        target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      } else {
        target.setCustomValidity('');
      }
    }
  });

  // Форма отправки фото
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    function successHandler() {
      uploadOverlay.classList.add('hidden');
    }

    function errorHandler(errorMessage) {
      var node = document.createElement('div');

      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }

    window.save(form, successHandler, errorHandler);
  });

})();
