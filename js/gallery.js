'use strict';

(function () {
  var picture = document
    .querySelector('#picture')
    .content.querySelector('.picture__link');

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = bigPicture.querySelector('#picture-cancel');

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

    return picture.cloneNode(true);
  }

  /**
   * Получает фото с сервера
   * @param  {[type]} photos
   */
  function generatePhoto(photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      var clone = clonePhoto(photo);
      fragment.appendChild(clone);

      clone.addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', photoEscPressHandler);
      });
    });
    pictures.appendChild(fragment);
  }

  window.load(generatePhoto);
})();
