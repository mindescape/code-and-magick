'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var WIZARDS_AMOUNT = 4;

  var wizardsContainer = document.querySelector('.setup-similar-list');
  var wizards = [];
  var selectedCoatColor = window.getComputedStyle(wizardCoat).fill;
  var selectedEyesColor = 'black';

  function renderWizards(data) {
    window.utils.renderElements(data, wizardsContainer, setWizardTemplate);
    wizardsContainer.parentElement.classList.remove('hidden');
  }

  function setWizardTemplate(wizard) {
    var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  function onFireballColorChange(evt) {
    wizardRandomColoring(evt.target, FIREBALL_COLORS, document.querySelector('input[name="fireball-color"]'));
  }

  function onCoatColorChange(evt) {
    var color = wizardRandomColoring(evt.target, COAT_COLORS, document.querySelector('input[name="coat-color"]'));
    selectedCoatColor = color;
    debounceFunc();
  }

  function onEyesColorChange(evt) {
    var color = wizardRandomColoring(evt.target, EYES_COLORS, document.querySelector('input[name="eyes-color"]'));
    selectedEyesColor = color;
    debounceFunc();
  }

  function wizardRandomColoring(element, colors, valueInput) {
    var randomColor = window.utils.getRandomArrayElement(colors);

    if (element.tagName === 'DIV') {
      element.style.backgroundColor = randomColor;
    } else {
      element.style.fill = randomColor;
    }
    valueInput.value = randomColor;

    return randomColor;
  }

  function onDataLoad(data) {
    wizards = data;
    sortBySimilarity();
    renderWizards(wizards.slice(0, WIZARDS_AMOUNT));
  }

  function sortBySimilarity() {
    setSimilarityRank();
    wizards.sort(function (first, second) {
      return second.rank - first.rank;
    });
  }

  function setSimilarityRank() {
    wizards.forEach(function (wizard) {
      var rank = 0;
      if (wizard.colorCoat === selectedCoatColor) {
        rank += 3;
      }
      if (wizard.colorEyes === selectedEyesColor) {
        rank += 2;
      }
      wizard.rank = rank;
    });
  }

  function updateWizards() {
    sortBySimilarity();
    window.utils.removeChildren(wizardsContainer);
    renderWizards(wizards.slice(0, WIZARDS_AMOUNT));
  }

  function onDataLoadError(msg) {
    var errorPopup = document.querySelector('.error-popup');
    var tryAgainBtn = document.querySelector('.error-popup-btn');

    tryAgainBtn.addEventListener('click', function () {
      errorPopup.style.display = 'none';
      loadWizards();
    });

    errorPopup.style.display = 'block';
    throw new Error(msg);
  }

  function loadWizards() {
    window.backend.load(onDataLoad, onDataLoadError);
  }

  var debounceFunc = window.utils.debounce(function () {
    updateWizards();
  });

  loadWizards();
  wizardCoat.addEventListener('click', onCoatColorChange);
  wizardEyes.addEventListener('click', onEyesColorChange);
  wizardFireball.addEventListener('click', onFireballColorChange);
})();
