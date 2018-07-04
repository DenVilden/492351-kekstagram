'use strict';

(function () {
  // Получение запроса
  window.load = function (URL, success, error) {
    window.ajax.getResponse(success, error, 'GET', URL);
  };

  // Отправка запроса
  window.save = function (URL, data, success, error) {
    window.ajax.getResponse(success, error, 'POST', URL, data);
  };
})();
