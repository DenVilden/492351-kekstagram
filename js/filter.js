'use strict';

(function () {
  var template = document.querySelector('#picture').content;
  var pictures = document.querySelector('.pictures');
  var error = template.querySelector('.img-upload__message--error');

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
    value = isNaN(value) ? 0 : value + step;
    value = value > 100 ? 100 : value; // Отрезает если больше 100
    resizeValue.value = value + '%';
    uploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }

  resizePlus.addEventListener('click', resizeIncreaseHandler);

  // Уменьшает масштаб фото на 25%
  function resizeDecreaseHandler() {
    var value = parseInt(resizeValue.value, 10);
    var step = 25;
    value = isNaN(value) ? 0 : value - step;
    value = value < 25 ? 25 : value;
    resizeValue.value = value + '%';
    uploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }

  resizeMinus.addEventListener('click', resizeDecreaseHandler);

  // Обнуляет эффект фото
  function removePhotoEffect() {
    uploadPreview.removeAttribute('class');
    uploadPreview.removeAttribute('style');
    scaleLevel.removeAttribute('style');
    scalePin.removeAttribute('style');
    scaleValue.value = '';
    uploadPreview.classList.add('img-upload__preview');
  }

  // Меняет эффект фото по клику
  function filterChangeHandler() {
    var Effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

    Effects.forEach(function (name) {
      var obj = pictures.querySelector('#effect-' + name);

      obj.addEventListener(
          'click',
          (function (effect) {
            return function () {
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

  filterChangeHandler();

  // Интенсивность эффекта
  function sliderEffectHandler() {
    var value = scaleValue.value; // Значение скрытого input

    var Filters = {
      chrome: 'grayscale(' + value / 100 + ')',
      sepia: 'sepia(' + value / 100 + ')',
      marvin: 'invert(' + value + '%' + ')',
      phobos: 'blur(' + (5 * value) / 100 + 'px' + ')',
      heat:
        'brightness(' + ((3 * value) / 100 < 1 ? 1 : (3 * value) / 100) + ')'
    };

    for (var effect in Filters) {
      if (uploadPreview.classList.contains('effects__preview--' + effect)) {
        uploadPreview.style.filter = Filters[effect];
      }
    }
  }

  scalePin.addEventListener('change', sliderEffectHandler);

  // Форма отправки фото
  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    function successHandler() {
      uploadOverlay.classList.add('hidden');
      removePhotoEffect();
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

    var URL = 'https://js.dump.academy/kekstagram';
    window.save(URL, uploadForm, successHandler, errorHandler);
  });
})();
