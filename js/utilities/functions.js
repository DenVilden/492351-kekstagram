'use strict';

(function () {

  window.getRandomItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.haveDuplicates = function (arr) {
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
  };

})();
