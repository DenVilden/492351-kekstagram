'use strict';

(function () {
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var scaleValue = document.querySelector('.scale__value');

  scalePin.addEventListener('mousedown', function () {
    var scaleWidth = 453;
    var startCoords = scaleLevel.getBoundingClientRect().left;

    function mouseMoveHandler(evt) {
      // Расчет координат в процентах
      var moveCoords = parseInt(
          (((evt.clientX - startCoords) / scaleWidth) * 100).toFixed(2),
          10
      );
      moveCoords = moveCoords > 100 ? 100 : moveCoords; // Отсекается больше 100
      moveCoords = moveCoords < 0 ? 0 : moveCoords;
      scalePin.style.left = moveCoords + '%';
      scaleLevel.style.width = moveCoords + '%';
      scaleValue.value = moveCoords; // Записывается в скрытый input

      // Срабатывание события onChange
      scalePin.dispatchEvent(new Event('change'));
    }

    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
