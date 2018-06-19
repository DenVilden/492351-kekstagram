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

var photos = [];
var photoObject = {};

var fragment = document.createDocumentFragment();
var picturesList = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var socialComments = document.querySelector('.social__comments');
var picture = document.querySelector('#picture').content.querySelector('.picture__link');

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
var buildPhoto = function (obj, arr) {
  for (var i = 0; i < 25; i++) {
    createPhoto(obj, i);
    arr.push(obj);
    fragment.appendChild(clonePhoto(arr[i]));
  }
  picturesList.appendChild(fragment);
};

buildPhoto(photoObject, photos);
