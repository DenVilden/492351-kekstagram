'use strict';

(function () {

  // Получение запроса
  window.load = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/kekstagram/data';

    getResponse(onSuccess, onError, 'GET', URL);
  };

  // Отправка запроса
  window.save = function (onSuccess, onError, data) {
    var URL = 'https://js.dump.academy/kekstagram';

    getResponse(onSuccess, onError, 'POST', URL, data);
  };

  function getResponse(onSuccess, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
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

    xhr.open(method, url);
    xhr.send(new FormData(data));
  }

})();
