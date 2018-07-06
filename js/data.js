'use strict';

(function () {
  var USER_DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. ',
    'Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var template = document.querySelector('#picture').content;
  var picture = document
    .querySelector('#picture')
    .content.querySelector('.picture__link');

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var pictureCancel = bigPicture.querySelector('#picture-cancel');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialComment = template.querySelector('.social__comment');
  var imgSort = document.querySelector('.img-filters');

  // Проверка на нажатие ESC
  function photoEscPressHandler(evt) {
    window.util.isEscEvent(evt, previewCloseHandler);
  }

  // Закрывает превью фото
  function previewCloseHandler() {
    bigPicture.classList.add('hidden');
    document.body.removeAttribute('class');
    document.removeEventListener('keydown', photoEscPressHandler);
    socialComments.textContent = '';
  }

  pictureCancel.addEventListener('click', previewCloseHandler);

  // Клонирует блок фото
  function clonePhoto(arr) {
    picture.querySelector('.picture__img').src = arr.url;
    picture.querySelector('.picture__stat--likes').textContent = arr.likes;
    picture.querySelector('.picture__stat--comments').textContent =
      arr.comments.length;

    return picture.cloneNode(true);
  }

  // Подставляет значения фото в разметку
  function buildPreview(target) {
    bigPicture.querySelector(
        '.likes-count'
    ).textContent = target.nextElementSibling.querySelector(
        '.picture__stat--likes'
    ).textContent;
    bigPicture.querySelector(
        '.comments-count'
    ).textContent = target.nextElementSibling.querySelector(
        '.picture__stat--comments'
    ).textContent;
    bigPicture.querySelector('.big-picture__img img').src = target.src;
  }

  // Загружает комментарии
  function buildComments(arr) {
    socialComment.querySelector('.social__picture').src =
      'img/avatar-' + window.funcs.getRandomNumber(1, 6) + '.svg';
    socialComment.querySelector('.social__text').textContent = arr.comments;
    bigPicture.querySelector(
        '.social__caption'
    ).textContent = window.funcs.getRandomItem(USER_DESCRIPTION);

    return socialComment.cloneNode(true);
  }

  // Добавляет фотки в DOM
  window.data = function (data) {
    clearPhotos();
    data.forEach(function (photo) {
      var clone = clonePhoto(photo); // Элемент массива(фотка)
      pictures.appendChild(clone);
    });
    socialComments.appendChild(buildComments(data[0])); // Временно
    imgSort.classList.remove('img-filters--inactive');
  };

  // Удаляет фотки из DOM
  function clearPhotos() {
    var photosDOM = document.querySelectorAll('.picture__link');
    photosDOM.forEach(function (photo) {
      photo.remove();
    });
  }

  // Подставляет значения фото в разметку при клике
  function buildPreviewHandler() {
    pictures.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.classList.contains('picture__img')) {
        bigPicture.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', photoEscPressHandler);
        buildPreview(target);
      }
    });
  }

  buildPreviewHandler();
})();
