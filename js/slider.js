'use strict';

(function () {

  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var scaleValue = document.querySelector('.scale__value');

  scalePin.addEventListener('mousedown', function () {
    var scaleWidth = 453;
    var startCoords = scaleLevel.getBoundingClientRect().left;

    function onMouseMove(evt) {
      // Расчет координат в процентах
      var moveCoords = parseInt(((evt.clientX - startCoords) / scaleWidth * 100).toFixed(2), 10);
      moveCoords = (moveCoords > 100) ? 100 : moveCoords;
      moveCoords = (moveCoords < 0) ? 0 : moveCoords;
      scalePin.style.left = moveCoords + '%';
      scaleLevel.style.width = moveCoords + '%';
      scaleValue.value = moveCoords;

      // Срабатывание события onChange
      scalePin.dispatchEvent(new Event('change'));
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();