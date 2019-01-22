'use strict';

window.util = (function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;

  return {
    onError: function (message) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = message;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    isEventEsc: function (evt, action) {
      if (evt.keyCode === ESC_KEY) {
        action();
      }
    },
    isEventEnter: function (evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    },
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    MOCK: {
      COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
      EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
    }
  };
})();
