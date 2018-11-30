'use strict';

(function() {
  // Получение запроса
  window.load = function(success, error) {
    var URL = 'https://js.dump.academy/kekstagram/data';
    window.ajax.getResponse(success, error, 'GET', URL);
  };

  // Отправка запроса
  window.save = function(data, success, error) {
    var URL = 'https://js.dump.academy/kekstagram';
    window.ajax.getResponse(success, error, 'POST', URL, data);
  };
})();
