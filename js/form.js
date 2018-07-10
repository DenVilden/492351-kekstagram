'use strict';

(function () {
  var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  var error = document
    .querySelector('#picture')
    .content.querySelector('.img-upload__message--error');
  var pictures = document.querySelector('.pictures');

  var uploadFile = pictures.querySelector('#upload-file');
  var uploadOverlay = pictures.querySelector('.img-upload__overlay');
  var uploadPreview = uploadOverlay.querySelector('.img-upload__preview');
  var uploadCancel = uploadOverlay.querySelector('.img-upload__cancel');
  var uploadScale = uploadOverlay.querySelector('.img-upload__scale');
  var uploadForm = pictures.querySelector('.img-upload__form');

  var resizePlus = uploadOverlay.querySelector('.resize__control--plus');
  var resizeMinus = uploadOverlay.querySelector('.resize__control--minus');
  var resizeValue = uploadOverlay.querySelector('.resize__control--value');

  var scalePin = uploadOverlay.querySelector('.scale__pin');
  var scaleLevel = uploadOverlay.querySelector('.scale__level');
  var scaleValue = uploadOverlay.querySelector('.scale__value');

  var textDescription = uploadOverlay.querySelector('.text__description');
  var textHashtags = uploadOverlay.querySelector('.text__hashtags');

  // Увеличивает масштаб фото на 25%
  function resizeIncreaseHandler() {
    var value = parseInt(resizeValue.value, 10); // Берет текущее значение
    var step = 25;
    value = value + step; // Прибавляет 25 к текущему значению
    value = value > 100 ? 100 : value; // Ограничение до 100
    resizeValue.value = value + '%';
    uploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }

  // Уменьшает масштаб фото на 25%
  function resizeDecreaseHandler() {
    var value = parseInt(resizeValue.value, 10);
    var step = 25;
    value = value - step;
    value = value < 25 ? 25 : value;
    resizeValue.value = value + '%';
    uploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }

  // Обнуляет эффект фото
  function removePhotoEffect() {
    uploadPreview.removeAttribute('style');
    scaleLevel.removeAttribute('style');
    scalePin.removeAttribute('style');
    scaleValue.value = '';
    uploadPreview.classList = 'img-upload__preview';
  }

  // Меняет эффект фото по клику
  function filterChangeHandler() {
    effects.forEach(function (name) {
      var obj = pictures.querySelector('#effect-' + name); // Скрытый input c эффектами

      obj.addEventListener(
          'click',
          (function (effect) {
            return function () {
            // Если выбран оригинал - прячем слайдер
              if (effect === 'none') {
                uploadScale.classList.add('hidden');
              } else {
                uploadScale.classList.remove('hidden');
              }
              removePhotoEffect();
              uploadPreview.classList.add('effects__preview--' + effect);
            };
          })(name)
      );
    });
  }

  // Интенсивность эффекта
  function sliderEffectHandler() {
    var value = scaleValue.value; // Значение скрытого input

    var filters = {
      chrome: 'grayscale(' + value / 100 + ')',
      sepia: 'sepia(' + value / 100 + ')',
      marvin: 'invert(' + value + '%' + ')',
      phobos: 'blur(' + (5 * value) / 100 + 'px' + ')',
      heat:
        'brightness(' + ((3 * value) / 100 < 1 ? 1 : (3 * value) / 100) + ')'
    };
    // Добавляет фильтр к соответствующему классу
    for (var effect in filters) {
      if (uploadPreview.classList.contains('effects__preview--' + effect)) {
        uploadPreview.style.filter = filters[effect];
      }
    }
  }

  // Проверка на нажатие ESC
  function photoEscPressHandler(evt) {
    window.util.isEscEvent(evt, uploadCloseHandler);
  }

  // Удаляет EventListener с эффектов фото при закрытии
  function effectsListenerHandler() {
    var effectsRadio = document.querySelectorAll('.effects__radio');
    effectsRadio.forEach(function (button) {
      var newElement = button.cloneNode(true);
      button.parentNode.replaceChild(newElement, button);
    });
  }

  // Отменяет ESC при фокусе
  function hashtagsFocusHandler() {
    document.removeEventListener('keydown', photoEscPressHandler);
  }

  // Добавляет ESC при потере фокуса
  function hashtagsBlurHandler() {
    document.addEventListener('keydown', photoEscPressHandler);
  }

  // Открывает форму
  function uploadOpenHandler() {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', photoEscPressHandler);
    uploadCancel.addEventListener('click', uploadCloseHandler);
    resizePlus.addEventListener('click', resizeIncreaseHandler);
    resizeMinus.addEventListener('click', resizeDecreaseHandler);
    scalePin.addEventListener('slider', sliderEffectHandler);
    uploadForm.addEventListener('submit', uploadFormHandler);
    textHashtags.addEventListener('blur', hashtagsBlurHandler);
    textDescription.addEventListener('blur', hashtagsBlurHandler);
    textHashtags.addEventListener('focus', hashtagsFocusHandler);
    textDescription.addEventListener('focus', hashtagsFocusHandler);
    textHashtags.addEventListener('input', window.hashtagValidation);
    filterChangeHandler();
  }

  // Срабатывание события onChange при добавлении фото
  uploadFile.addEventListener('change', uploadOpenHandler);

  // Закрывает форму
  function uploadCloseHandler() {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', photoEscPressHandler);
    uploadCancel.removeEventListener('click', uploadCloseHandler);
    resizePlus.removeEventListener('click', resizeIncreaseHandler);
    resizeMinus.removeEventListener('click', resizeDecreaseHandler);
    scalePin.removeEventListener('slider', sliderEffectHandler);
    uploadForm.removeEventListener('submit', uploadFormHandler);
    textHashtags.removeEventListener('blur', hashtagsBlurHandler);
    textDescription.removeEventListener('blur', hashtagsBlurHandler);
    textHashtags.removeEventListener('focus', hashtagsFocusHandler);
    textDescription.removeEventListener('focus', hashtagsFocusHandler);
    textHashtags.removeEventListener('input', window.hashtagValidation);
    effectsListenerHandler();
  }

  // При ошибке
  function errorHandler() {
    error.classList.remove('hidden');
    pictures.appendChild(error);
  }

  // При успешном запросе
  function successHandler() {
    removePhotoEffect();
    textDescription.value = '';
    textHashtags.value = '';
    uploadScale.classList.add('hidden');
    uploadOverlay.querySelector('#effect-none').checked = true;
  }

  // Отправка фото
  function uploadFormHandler(evt) {
    evt.preventDefault();
    uploadCloseHandler();
    window.save(uploadForm, successHandler, errorHandler);
  }
})();
