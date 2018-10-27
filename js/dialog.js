'use strict';

/* Dialog */

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var dialogHandler = setup.querySelector('.upload');
  var dialogForm = setup.querySelector('.setup-wizard-form');

  function onDialogEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeDialog();
    }
  }

  function openDialog() {
    if (setup.hasAttribute('style')) {
      setup.removeAttribute('style');
    }
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onDialogEscPress);
  }

  function closeDialog() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onDialogEscPress);
  }

  setupOpen.addEventListener('click', function () {
    openDialog();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openDialog();
    }
  });

  setupClose.addEventListener('click', function () {
    closeDialog();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeDialog();
    }
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  dialogForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(dialogForm), closeDialog, function (msg) {
      throw new Error(msg);
    });
  });
})();
