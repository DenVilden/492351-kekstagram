'use strict';

(function () {

  var USER_COMMENT = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var USER_DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. ',
    'Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var photos = [];

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

  // Закрывает фото
  function closePreview() {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
  pictureCancel.addEventListener('click', closePreview);

  // Добавляет объект в массив
  function createPhoto(index) {
    var photoDescription = {
      url: 'photos/' + (index + 1) + '.jpg',
      likes: window.getRandomNumber(15, 200),
      comments: window.getRandomItem(USER_COMMENT),
      description: window.getRandomItem(USER_DESCRIPTION)
    };
    return photoDescription;
  }

  // Создает объект в DOM
  function clonePhoto(arr) {
    picture.querySelector('.picture__img').src = arr.url;
    picture.querySelector('.picture__stat--likes').textContent = arr.likes;
    picture.querySelector('.picture__stat--comments');

    bigPicture.querySelector('.big-picture__img').src = arr.url;
    bigPicture.querySelector('.likes-count').textContent = arr.likes;
    bigPicture.querySelector('.comments-count');
    bigPicture.querySelector('.social__caption').textContent = arr.description;

    socialComments.querySelector('.social__picture').src = 'img/avatar-' + window.getRandomNumber(1, 6) + '.svg';
    socialComments.querySelector('.social__text').textContent = arr.comments;

    return picture.cloneNode(true);
  }

  // Генерирует фото в массив и отрисовывает в DOM
  function buildPhoto() {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 25; i++) {
      photos.push(createPhoto(i));
      var clone = clonePhoto(photos[i]);
      clone.addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
      });
      fragment.appendChild(clone);
    }
    pictures.appendChild(fragment);
  }

  buildPhoto();

})();
