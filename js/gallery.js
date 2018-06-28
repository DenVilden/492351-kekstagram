'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = bigPicture.querySelector('#picture-cancel');
  var socialComments = bigPicture.querySelector('.social__comments');
  var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');

    // Проверка на нажатие ESC
  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closePreview);
  }

  // Закрывает превью фото
  function closePreview() {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
  pictureCancel.addEventListener('click', closePreview);

  // Создает объект в DOM
  function clonePhoto(arr) {
    picture.querySelector('.picture__img').src = arr.url;
    picture.querySelector('.picture__stat--likes').textContent = arr.likes;

    bigPicture.querySelector('.big-picture__img').src = arr.url;
    bigPicture.querySelector('.likes-count').textContent = arr.likes;

    socialComments.querySelector('.social__picture').src = 'img/avatar-' + window.getRandomNumber(1, 6) + '.svg';
    socialComments.querySelector('.social__text').textContent = window.getRandomItem(arr.comments);

    return picture.cloneNode(true);
  }

  // Получает фото с сервера
  function generatePhoto(photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 25; i++) {
      var clone = clonePhoto(photos[i]);
      fragment.appendChild(clone);

      clone.addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
      });
    }
    pictures.appendChild(fragment);
  }

  window.load(generatePhoto);

})();
