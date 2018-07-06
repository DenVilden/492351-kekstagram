'use strict';

(function () {
  var template = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');
  var error = template.querySelector('.img-upload__message--error');

  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadScale = uploadOverlay.querySelector('.img-upload__scale');

  var textHashtags = uploadOverlay.querySelector('.text__hashtags');
  var textDescription = uploadOverlay.querySelector('.text__description');

  // Проверка валидности хештагов
  textHashtags.addEventListener('input', function (evt) {
    var target = evt.target;
    var split = target.value.split(' '); // Формирует массив из хэштегов
    for (var i = 0; i < split.length; i++) {
      var hashtag = split[i];
      if (hashtag.indexOf('#') !== 0) {
        target.setCustomValidity(
            'Хэш-тег должен начинаться с символа # (решётка)'
        );
        break;
      } else if (hashtag.length < 2) {
        target.setCustomValidity(
            'Хэш-тег не может состоять только из одной решётки'
        );
        break;
      } else if (hashtag.indexOf('#', 2) > 1) {
        target.setCustomValidity('Хэш-теги должны разделяться пробелами');
        break;
      } else if (window.funcs.haveDuplicates(split)) {
        target.setCustomValidity(
            'Один и тот же хэш-тег не может быть использован дважды'
        );
        break;
      } else if (split.length > 5) {
        target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        break;
      } else {
        target.setCustomValidity('');
      }
    }
  });

  // Форма отправки фото
  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    function successHandler() {
      uploadOverlay.classList.add('hidden');
      window.removePhotoEffect();
      textDescription.value = '';
      textHashtags.value = '';
      uploadScale.classList.add('hidden');
      uploadOverlay.querySelector('#effect-none').checked = true;
    }

    function errorHandler() {
      uploadOverlay.classList.add('hidden');
      error.classList.remove('hidden');
      pictures.appendChild(error);
    }

    window.save(uploadForm, successHandler, errorHandler);
  });
})();
