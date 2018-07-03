'use strict';

(function () {
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var textHashtags = uploadOverlay.querySelector('.text__hashtags');

  /**
   * Проверка валидности хештагов
   * @param  {[type]} evt
   * @return {[type]}
   */
  textHashtags.addEventListener('input', function (evt) {
    var target = evt.target;
    var split = target.value.split(' '); // Формирует массив из хэштегов

    split.forEach(function (hashtag) {
      if (hashtag.indexOf('#') !== 0) {
        target.setCustomValidity(
            'Хэш-тег должен начинаться с символа # (решётка)'
        );
      } else if (hashtag.length < 2) {
        target.setCustomValidity(
            'Хэш-тег не может состоять только из одной решётки'
        );
      } else if (hashtag.indexOf('#', 2) > 1) {
        target.setCustomValidity('Хэш-теги должны разделяться пробелами');
      } else if (window.funcs.haveDuplicates(split)) {
        target.setCustomValidity(
            'Один и тот же хэш-тег не может быть использован дважды'
        );
      } else if (split.length > 5) {
        target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      } else {
        target.setCustomValidity('');
      }
    });
  });
})();
