'use strict';

(function () {

  var pictures = document.querySelector('.pictures');


  var uploadFile = pictures.querySelector('#upload-file');
  var uploadOverlay = pictures.querySelector('.img-upload__overlay');
  var uploadPreview = pictures.querySelector('.img-upload__preview');
  var uploadCancel = pictures.querySelector('.img-upload__cancel');


  var resizePlus = pictures.querySelector('.resize__control--plus');
  var resizeMinus = pictures.querySelector('.resize__control--minus');

  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var scaleValue = document.querySelector('.scale__value');

  // Проверка на нажатие ESC
  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closeFilter);
  }

  // Добавляет фото в фильтр
  function uploadPhoto() {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }
  uploadFile.addEventListener('change', uploadPhoto);

  // Закрывает фильтр
  function closeFilter() {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
  uploadCancel.addEventListener('click', closeFilter);

  // Увеличивает масштаб фото на 25%
  function increaseScale() {
    var value = parseInt(pictures.querySelector('.resize__control--value').value, 10);
    var step = 25;
    value = isNaN(value) ? 0 : value + step;
    value = (value > 100) ? 100 : value;
    pictures.querySelector('.resize__control--value').value = value + '%';
    uploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }
  resizePlus.addEventListener('click', increaseScale);

  // Уменьшает масштаб фото на 25%
  function decreaseScale() {
    var value = parseInt(pictures.querySelector('.resize__control--value').value, 10);
    var step = 25;
    value = isNaN(value) ? 0 : value - step;
    value = (value < 25) ? 25 : value;
    pictures.querySelector('.resize__control--value').value = value + '%';
    uploadPreview.style.transform = 'scale(' + value / 100 + ')';
  }
  resizeMinus.addEventListener('click', decreaseScale);

  // Обнуляет эффект фото
  function removeEffectsClass() {
    uploadPreview.removeAttribute('class');
    uploadPreview.removeAttribute('style');
    scaleLevel.removeAttribute('style');
    scalePin.removeAttribute('style');
    scaleValue.value = 100;
    uploadPreview.classList.add('img-upload__preview');
  }

  // Меняет эффект фото по клику
  function listenEffectsButton() {
    var photoEffects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

    for (var i = 0; i < photoEffects.length; i++) {
      var name = photoEffects[i];
      var obj = pictures.querySelector('#effect-' + name);

      obj.addEventListener('click', (function (str) {
        return function () {
          if (str === 'none') {
            pictures.querySelector('.img-upload__scale').classList.add('hidden');
          } else {
            pictures.querySelector('.img-upload__scale').classList.remove('hidden');
          }
          removeEffectsClass();
          uploadPreview.classList.add('effects__preview--' + str);
        };
      })(name));
    }
  }
  listenEffectsButton();

  // Интенсивность эффекта
  scalePin.addEventListener('change', function () {
    var value = scaleValue.value;

    var filters = {
      'chrome': 'grayscale(' + value / 100 + ')',
      'sepia': 'sepia(' + value / 100 + ')',
      'marvin': 'invert(' + value + '%' + ')',
      'phobos': 'blur(' + 5 * value / 100 + 'px' + ')',
      'heat': 'brightness(' + ((3 * value / 100) < 1 ? 1 : (3 * value / 100)) + ')'
    };

    for (var effect in filters) {
      if (uploadPreview.classList.contains('effects__preview--' + effect)) {
        uploadPreview.style.filter = filters[effect];
      }
    }
  });

})();
