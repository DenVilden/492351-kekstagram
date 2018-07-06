'use strict';

(function () {
  var pictures = document.querySelector('.pictures');

  var uploadFile = pictures.querySelector('#upload-file');
  var uploadOverlay = pictures.querySelector('.img-upload__overlay');
  var uploadPreview = uploadOverlay.querySelector('.img-upload__preview');
  var uploadCancel = uploadOverlay.querySelector('.img-upload__cancel');
  var uploadScale = uploadOverlay.querySelector('.img-upload__scale');

  var resizePlus = uploadOverlay.querySelector('.resize__control--plus');
  var resizeMinus = uploadOverlay.querySelector('.resize__control--minus');
  var resizeValue = uploadOverlay.querySelector('.resize__control--value');

  var scalePin = uploadOverlay.querySelector('.scale__pin');
  var scaleLevel = uploadOverlay.querySelector('.scale__level');
  var scaleValue = uploadOverlay.querySelector('.scale__value');

  // Проверка на нажатие ESC
  function photoEscPressHandler(evt) {
    window.util.isEscEvent(evt, uploadCloseHandler);
  }

  // Добавляет фото в фильтр
  function uploadHandler() {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', photoEscPressHandler);
  }

  uploadFile.addEventListener('change', uploadHandler);

  // Закрывает фильтр
  function uploadCloseHandler() {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', photoEscPressHandler);
  }

  uploadCancel.addEventListener('click', uploadCloseHandler);

  // Увеличивает масштаб фото на 25%
  function resizeIncreaseHandler() {
    var value = parseInt(resizeValue.value, 10); // Берет текущее значение
    var step = 25;
    value = value + step; // Прибавляет 25 к текущему значению
    value = value > 100 ? 100 : value; // Ограничение до 100
    resizeValue.value = value + '%';
    uploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }

  resizePlus.addEventListener('click', resizeIncreaseHandler);

  // Уменьшает масштаб фото на 25%
  function resizeDecreaseHandler() {
    var value = parseInt(resizeValue.value, 10);
    var step = 25;
    value = value - step;
    value = value < 25 ? 25 : value;
    resizeValue.value = value + '%';
    uploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }

  resizeMinus.addEventListener('click', resizeDecreaseHandler);

  // Обнуляет эффект фото
  window.removePhotoEffect = function () {
    uploadPreview.removeAttribute('class');
    uploadPreview.removeAttribute('style');
    scaleLevel.removeAttribute('style');
    scalePin.removeAttribute('style');
    scaleValue.value = '';
    uploadPreview.classList.add('img-upload__preview');
  };

  // Меняет эффект фото по клику
  function filterChangeHandler() {
    var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

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
              window.removePhotoEffect();
              uploadPreview.classList.add('effects__preview--' + effect);
            };
          })(name)
      );
    });
  }

  filterChangeHandler();

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

  scalePin.addEventListener('slider', sliderEffectHandler);
})();
