'use strict';

(function() {
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var scaleValue = document.querySelector('.scale__value');

  scalePin.addEventListener('mousedown', function() {
    var scaleWidth = 453; // Длина слайдера
    var startCoords = scaleLevel.getBoundingClientRect().left; // Получает координаты по оси Х при нажатии

    function mouseMoveHandler(evt) {
      var moveCoords = (
        ((evt.clientX - startCoords) / scaleWidth) *
        100
      ).toFixed(2); // Расчет координат в процентах
      moveCoords = moveCoords > 100 ? 100 : moveCoords; // Отсекается больше 100
      moveCoords = moveCoords < 0 ? 0 : moveCoords;
      scalePin.style.left = moveCoords + '%';
      scaleLevel.style.width = moveCoords + '%';
      scaleValue.value = moveCoords; // Записывается в скрытый input

      // Срабатывание события onChange
      scalePin.dispatchEvent(new Event('slider'));
    }

    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
