'use strict';

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

var ESC_KEYCODE = 27;

var photos = [];
var photoObject = {};

var fragment = document.createDocumentFragment();
var picturesList = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var socialComments = document.querySelector('.social__comments');
var picture = document.querySelector('#picture')
    .content
    .querySelector('.picture__link');
var uploadFile = picturesList.querySelector('#upload-file');
var uploadOverlay = picturesList.querySelector('.img-upload__overlay');
var uploadCancel = picturesList.querySelector('#upload-cancel');
var bigPictureCancel = bigPicture.querySelector('#picture-cancel');
var uploadPreview = picturesList.querySelector('.img-upload__preview');
var resizePlus = picturesList.querySelector('.resize__control--plus');
var resizeMinus = picturesList.querySelector('.resize__control--minus');
var photoEffects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

// Генерирует случаный элемент массива
var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Генерирует случайное число
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Добавляет объект в массив
var createPhoto = function (photo, index) {
  photo.url = 'photos/' + (index + 1) + '.jpg';
  photo.likes = getRandomNumber(15, 200);
  photo.comments = getRandomItem(USER_COMMENT);
  photo.description = getRandomItem(USER_DESCRIPTION);
};

// Создает объект в DOM
var clonePhoto = function (photo) {
  picture.querySelector('.picture__img').src = photo.url;
  picture.querySelector('.picture__stat--likes').textContent = photo.likes;
  picture.querySelector('.picture__stat--comments');

  bigPicture.querySelector('.big-picture__img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count');
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  socialComments.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  socialComments.querySelector('.social__text').textContent = photo.comments;

  return picture.cloneNode(true);
};

// Генерирует фото в массив и отрисовывает в DOM
var buildPhoto = function () {
  for (var i = 0; i < 25; i++) {
    createPhoto(photoObject, i);
    photos.push(photoObject);
    var clone = clonePhoto(photos[i]);
    clone.addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
    });
    fragment.appendChild(clone);
  }
  picturesList.appendChild(fragment);
};

buildPhoto();

// Проверка на нажатие ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePhoto();
  }
};

// Прячет окно редактирования фото
var closePhoto = function () {
  uploadOverlay.classList.add('hidden');
  bigPicture.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
});

uploadCancel.addEventListener('click', closePhoto);
uploadCancel.addEventListener('keydown', closePhoto);

bigPictureCancel.addEventListener('click', closePhoto);
bigPictureCancel.addEventListener('keydown', closePhoto);

// Увеличивает масштаб фото на 25%
var increaseResize = function () {
  var value = parseInt(picturesList.querySelector('.resize__control--value').value, 10);
  var step = 25;
  value = isNaN(value) ? 0 : value + step;
  value = (value > 100) ? 100 : value;
  picturesList.querySelector('.resize__control--value').value = value + '%';
  uploadPreview.style.transform = 'scale(' + value / 100 + ')';
};

resizePlus.addEventListener('click', increaseResize);

// Уменьшает масштаб фото на 25%
var decreaseResize = function () {
  var value = parseInt(picturesList.querySelector('.resize__control--value').value, 10);
  var step = 25;
  value = isNaN(value) ? 0 : value - step;
  value = (value < 25) ? 25 : value;
  picturesList.querySelector('.resize__control--value').value = value + '%';
  uploadPreview.style.transform = 'scale(' + value / 100 + ')';
};

resizeMinus.addEventListener('click', decreaseResize);

var removeEffectsClasses = function () {
  uploadPreview.querySelector('img').className = '';
};

// Меняет эффект фото по клику
var listenEffectsButton = function () {
  for (var index in photoEffects) {
    if ({}.hasOwnProperty.call(photoEffects, index)) {
      var obj = picturesList.querySelector('#effect-' + photoEffects[index]);
      obj.addEventListener('click', function () {
        var name = photoEffects[index];
        return function () {
          removeEffectsClasses();
          uploadPreview.querySelector('img').classList.add('effects__preview--' + name);
        };
      }(name));
    }
  }
};

listenEffectsButton();
