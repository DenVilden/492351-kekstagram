'use strict';

(function () {
  window.hashtagValidation = function (evt) {
    var MAX_SYMBOLS = 1;
    var MIN_SYMBOLS = 2;
    var MAX_HASHTAG_LENGTH = 20;
    var FROM_INDEX = 2;
    var NUMBER_OF_SPACES = 1;
    var MAX_HASHTAGS = 5;

    var target = evt.target;
    var split = target.value.split(' '); // Формирует массив из хэштегов
    for (var i = 0; i < split.length; i++) {
      var hashtag = split[i];
      if (hashtag.length >= MAX_SYMBOLS && hashtag.indexOf('#') !== 0) {
        target.setCustomValidity(
            'Хэш-тег должен начинаться с символа # (решётка)'
        );
        break;
      } else if (hashtag.length < MIN_SYMBOLS && hashtag.indexOf('#') === 0) {
        target.setCustomValidity(
            'Хэш-тег не может состоять только из одной решётки'
        );
        break;
      } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        target.setCustomValidity('Максимальная длина хэш-тега 20 символов');
        break;
      } else if (hashtag.indexOf('#', FROM_INDEX) > NUMBER_OF_SPACES) {
        target.setCustomValidity('Хэш-теги должны разделяться пробелами');
        break;
      } else if (window.funcs.haveDuplicates(split)) {
        target.setCustomValidity(
            'Один и тот же хэш-тег не может быть использован дважды'
        );
        break;
      } else if (split.length > MAX_HASHTAGS) {
        target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        break;
      } else {
        target.setCustomValidity('');
      }
    }
  };
})();
