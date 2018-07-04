'use strict';

(function () {
  // Получение запроса
  window.load = function (URL, success, error) {
    window.ajax.getResponse(success, error, 'GET', URL);
  };

  // Отправка запроса
  window.save = function (success, error, data) {
    var URL = 'https://js.dump.academy/kekstagram';
    window.ajax.getResponse(success, error, 'POST', URL, data);
  };
})();
