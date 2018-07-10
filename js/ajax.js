'use strict';

(function () {
  window.ajax = {
    getResponse: function (success, error, method, url, data) {
      var SUCCESS = 200;

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS) {
          success(xhr.response);
        } else {
          error('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        error('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        error('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10 сек

      xhr.open(method, url);
      xhr.send(new FormData(data));
    }
  };
})();
