'use strict';

// Popup
(function () {
  var setup = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = document.querySelector('.setup-close');
  var setupNameInput = setup.querySelector('.setup-user-name');
  var form = document.querySelector('.setup-wizard-form');


  // Submit form
  var onSuccess = function () {
    closePopup();
  };

  var onError = window.util.onError;

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.save(new FormData(form), onSuccess, onError);
  });


  // Popup handlers
  var onEscPress = function (evt) {
    if (document.activeElement !== setupNameInput) {
      window.util.isEventEsc(evt, closePopup);
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };

  setupOpenButton.addEventListener('click', function () {
    openPopup();
  });

  setupOpenButton.addEventListener('keydown', function (evt) {
    window.util.isEventEnter(evt, openPopup);
    document.addEventListener('keydown', onEscPress);
  });

  setupCloseButton.addEventListener('click', function () {
    closePopup();
  });

  setupCloseButton.addEventListener('keydown', function (evt) {
    window.util.isEventEsc(evt, closePopup);
    window.util.isEventEnter(evt, closePopup);
  });
})();


// Drag popup
(function () {
  var setup = document.querySelector('.setup');
  var popupHandler = document.querySelector('.upload');

  popupHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

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
          popupHandler.removeEventListener('click', onClickPreventDefault);
        };
        popupHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();


// Render similar wizards
(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var showSetupSimilarDOM = function () {
    var setupSimilar = document.querySelector('.setup-similar');
    setupSimilar.classList.remove('hidden');
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onSuccess = function (wizards) {
    var similarListDOM = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListDOM.appendChild(fragment);
    showSetupSimilarDOM();
  };

  var onError = window.util.onError;

  window.load(onSuccess, onError);
})();


// Change wizard's appearance
(function () {
  var COAT_COLORS = window.util.MOCK.COAT_COLORS;
  var EYES_COLORS = window.util.MOCK.EYES_COLORS;
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupWizard = document.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
  var wizardCoatInput = document.querySelector('#coat-color');
  var wizardEyesInput = document.querySelector('#eyes-color');
  var wizardFireballInput = document.querySelector('#fireball-color');
  var getRandomElement = window.util.getRandomElement;

  var getCoatColor = function () {
    var randomElement = getRandomElement(COAT_COLORS);
    wizardCoatInput.value = randomElement;
    setupWizardCoat.style.fill = randomElement;
  };

  var getEyesColor = function () {
    var randomElement = getRandomElement(EYES_COLORS);
    wizardEyesInput.value = randomElement;
    setupWizardEyes.style.fill = randomElement;
  };

  var getFireballColor = function () {
    var randomElement = getRandomElement(FIREBALL_COLORS);
    wizardFireballInput.value = randomElement;
    setupWizardFireball.style.backgroundColor = randomElement;
  };

  setupWizardCoat.addEventListener('click', function () {
    getCoatColor();
  });

  setupWizardEyes.addEventListener('click', function () {
    getEyesColor();
  });

  setupWizardFireball.addEventListener('click', function () {
    getFireballColor();
  });
})();
