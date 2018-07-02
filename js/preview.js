'use strict';

(function () {
  var USER_COMMENT = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
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

  var bigPicture = document.querySelector('.big-picture');

  /**
   * Комментарии к фото
   * @type {String}
   */
  bigPicture.querySelector('.social__picture').src =
    'img/avatar-' + window.funcs.getRandomNumber(1, 6) + '.svg';
  bigPicture.querySelector(
      '.social__text'
  ).textContent = window.funcs.getRandomItem(USER_COMMENT);
  bigPicture.querySelector(
      '.social__caption'
  ).textContent = window.funcs.getRandomItem(USER_DESCRIPTION);
})();
