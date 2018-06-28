'use strict';

(function () {

  var textHashtags = document.querySelector('.text__hashtags');

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
      } else if (window.haveDuplicates(split)) {
        target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      } else if (split.length > 5) {
        target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      } else {
        target.setCustomValidity('');
      }
    }
  });

})();
