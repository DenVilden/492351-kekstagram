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
var textHashtags = picturesList.querySelector('.text__hashtags');
var scalePin = picturesList.querySelector('.scale__pin');
var scaleLevel = picturesList.querySelector('.scale__level');

// Генерирует случаный элемент массива
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Генерирует случайное число
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function haveDuplicates(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var lowCase = arr[i].toLowerCase();
    if (Object.keys(obj).indexOf(lowCase) > -1) {
      return true; // Если есть дубликаты
    } else {
      obj[lowCase] = arr[i];
    }
  }
  return false;
}

// Добавляет объект в массив
function createPhoto(index) {
  var photoDescription = {
    url: 'photos/' + (index + 1) + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: getRandomItem(USER_COMMENT),
    description: getRandomItem(USER_DESCRIPTION)
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

  socialComments.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  socialComments.querySelector('.social__text').textContent = arr.comments;

  return picture.cloneNode(true);
}

// Генерирует фото в массив и отрисовывает в DOM
function buildPhoto() {
  for (var i = 0; i < 25; i++) {
    photos.push(createPhoto(i));
    var clone = clonePhoto(photos[i]);
    clone.addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
    });
    fragment.appendChild(clone);
  }
  picturesList.appendChild(fragment);
}
buildPhoto();

// Проверка на нажатие ESC
function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePhoto();
  }
}

// Прячет окно редактирования фото
function closePhoto() {
  uploadOverlay.classList.add('hidden');
  bigPicture.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

// Добавляет фото на страницу
uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
});

uploadCancel.addEventListener('click', closePhoto);
uploadCancel.addEventListener('keydown', closePhoto);

bigPictureCancel.addEventListener('click', closePhoto);
bigPictureCancel.addEventListener('keydown', closePhoto);

// Увеличивает масштаб фото на 25%
function increaseScale() {
  var value = parseInt(picturesList.querySelector('.resize__control--value').value, 10);
  var step = 25;
  value = isNaN(value) ? 0 : value + step;
  value = (value > 100) ? 100 : value;
  picturesList.querySelector('.resize__control--value').value = value + '%';
  uploadPreview.style.transform = 'scale(' + value / 100 + ')';
}
resizePlus.addEventListener('click', increaseScale);

// Уменьшает масштаб фото на 25%
function decreaseScale() {
  var value = parseInt(picturesList.querySelector('.resize__control--value').value, 10);
  var step = 25;
  value = isNaN(value) ? 0 : value - step;
  value = (value < 25) ? 25 : value;
  picturesList.querySelector('.resize__control--value').value = value + '%';
  uploadPreview.style.transform = 'scale(' + value / 100 + ')';
}
resizeMinus.addEventListener('click', decreaseScale);

// Обнуляет эффект фото
function removeEffectsClass() {
  uploadPreview.removeAttribute('class');
  uploadPreview.removeAttribute('style');
  scaleLevel.removeAttribute('style');
  scalePin.removeAttribute('style');
  picturesList.querySelector('.scale__value').value = 100;
  uploadPreview.classList.add('img-upload__preview');
}

// Меняет эффект фото по клику
function listenEffectsButton() {
  for (var i = 0; i < photoEffects.length; i++) {
    var name = photoEffects[i];
    var obj = picturesList.querySelector('#effect-' + name);

    obj.addEventListener('click', (function (str) {
      return function () {
        removeEffectsClass();
        uploadPreview.classList.add('effects__preview--' + str);
      };
    })(name));
  }
}
listenEffectsButton();

// Проверка валидности хештегов
textHashtags.addEventListener('input', function (evt) {
  var target = evt.target;
  var split = target.value.split(' '); // Формирует массив из хэштегов

  for (var i = 0; i < split.length; i++) {
    var hashtag = split[i];

    if (hashtag.indexOf('#') !== 0) {
      target.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
    } else if (hashtag.length < 2) {
      target.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
    } else if (hashtag.indexOf('#', 2) > 1) {
      target.setCustomValidity('Хэш-теги должны разделяться пробелами');
    } else if (haveDuplicates(split)) {
      target.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else if (split.length > 5) {
      target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else {
      target.setCustomValidity('');
    }
  }
});

// Оживляет слайдер
scalePin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX
  };

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    var currentCoords = Math.round((scalePin.offsetLeft - shift.x) / 453 * 100); // Координаты в %
    currentCoords = (currentCoords > 100) ? 100 : currentCoords;
    currentCoords = (currentCoords < 0) ? 0 : currentCoords;
    scalePin.style.left = currentCoords + '%';
    scaleLevel.style.width = currentCoords + '%';
    picturesList.querySelector('.scale__value').value = currentCoords;

    // Хром
    if (uploadPreview.classList.contains('effects__preview--chrome')) {
      uploadPreview.style.filter = 'grayscale(' + currentCoords / 100 + ')';
    // Сепия
    } else if (uploadPreview.classList.contains('effects__preview--sepia')) {
      uploadPreview.style.filter = 'sepia(' + currentCoords / 100 + ')';
    // Марвин
    } else if (uploadPreview.classList.contains('effects__preview--marvin')) {
      uploadPreview.style.filter = 'invert(' + currentCoords + '%' + ')';
    // Фобос
    } else if (uploadPreview.classList.contains('effects__preview--phobos')) {
      uploadPreview.style.filter = 'blur(' + 5 * currentCoords / 100 + 'px' + ')';
    // Хит
    } else if (uploadPreview.classList.contains('effects__preview--heat')) {
      var heat = (3 * currentCoords / 100) < 1 ? 1 : (3 * currentCoords / 100); // Ограничение до 1 яркости
      uploadPreview.style.filter = 'brightness(' + heat + ')';
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
