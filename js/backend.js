'use strict';

(function () {

  // Получение запроса
  window.load = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();

    getResponse(onSuccess, onError, xhr);

    xhr.open('GET', URL);
    xhr.send();
  };

  // Отправка запроса
  window.save = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/kekstagram';
    var xhr = new XMLHttpRequest();

    getResponse(onSuccess, onError, xhr);

    xhr.open('POST', URL);
    xhr.send(new FormData(data));
  };

  function getResponse(onSuccess, onError, xhr) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
  }

})();
