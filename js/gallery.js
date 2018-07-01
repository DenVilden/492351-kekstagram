'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = bigPicture.querySelector('#picture-cancel');

  var picture = document.querySelector('#picture').content;

  // Проверка на нажатие ESC
  function photoEscPressHandler(evt) {
    window.util.isEscEvent(evt, previewCloseHandler);
  }

  // Закрывает превью фото
  function previewCloseHandler() {
    bigPicture.classList.add('hidden');
    document.body.removeAttribute('class');
    document.removeEventListener('keydown', photoEscPressHandler);
  }
  pictureCancel.addEventListener('click', previewCloseHandler);

  /**
   * Создает объект в DOM
   * @param  {[type]} arr
   * @return {[type]}
   */
  function clonePhoto(arr) {
    picture.querySelector('.picture__img').src = arr.url;
    picture.querySelector('.picture__stat--likes').textContent = arr.likes;
    picture.querySelector('.picture__stat--comments').textContent =
      arr.comments.length;

    bigPicture.querySelector('.big-picture__img').src = arr.url;
    bigPicture.querySelector('.likes-count').textContent = arr.likes;

    bigPicture.querySelector('.social__picture').src =
      'img/avatar-' + window.funcs.getRandomNumber(1, 6) + '.svg';
    bigPicture.querySelector(
        '.social__text'
    ).textContent = window.funcs.getRandomItem(arr.comments);

    return picture.cloneNode(true);
  }

  /**
   * Получает фото с сервера
   * @param  {[type]} photos
   */
  function generatePhoto(photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var clone = clonePhoto(photos[i]);
      fragment.appendChild(clone);

      clone.addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', photoEscPressHandler);
      });
    }
    pictures.appendChild(fragment);
  }

  window.load(generatePhoto);
})();
