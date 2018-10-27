'use strict';

(function () {
  function renderElements(elements, parentNode, modify) {
    var fragment = document.createDocumentFragment();

    elements.forEach(function (element) {
      fragment.appendChild(typeof modify === 'function' ? modify(element) : element);
    });

    parentNode.appendChild(fragment);
  }

  function removeChildren(elements) {
    while (elements.firstChild) {
      elements.removeChild(elements.firstChild);
    }
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  function getRandomArrayElement(arr) {
    if (!Array.isArray(arr)) {
      return null;
    }
    return arr.length ? arr[getRandomNumber(0, arr.length - 1)] : null;
  }

  function debounce(fn) {
    var lastTimeout = null;
    var DEBOUNCE_INTERVAL = 4000;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fn.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.utils = {
    renderElements: renderElements,
    removeChildren: removeChildren,
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    debounce: debounce
  };

})();


