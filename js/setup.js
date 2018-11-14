'use strict';

// Keys variables for event handlers
var ENTER_KEY = 13;
var ESC_KEY = 27;

// Mock data
var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupNameInput = setup.querySelector('.setup-user-name');
var setupWizard = document.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var WizardCoatInput = document.querySelector('#coat-color');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var WizardEyesInput = document.querySelector('#eyes-color');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
var WizardFireballInput = document.querySelector('#fireball-color');


// Event handlers for popup
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    if (document.activeElement !== setupNameInput) {
      closePopup();
    }
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    openPopup();
  }
  document.addEventListener('keydown', onPopupEscPress);
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    closePopup();
  }
});


// Similar wizards in setup block
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateWizardObject = function () {
  return {
    name: getRandomElement(NAMES) + ' ' + getRandomElement(LASTNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
  };
};

var generateWizardsData = function () {
  var wizards = [];
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards.push(generateWizardObject());
  }
  return wizards;
};

var renderSimilarWizards = function (wizards) {
  var similarListDOM = document.querySelector('.setup-similar-list');
  var wizardsElements = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    wizardsElements.appendChild(wizardElement);
  }
  similarListDOM.appendChild(wizardsElements);
};

var showSetupSimilarDOM = function () {
  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');
};

var wizardsData = generateWizardsData();
renderSimilarWizards(wizardsData);
showSetupSimilarDOM();


// Event handles for changing wizard's appearance
var changeCoatColor = function () {
  var randomElement = getRandomElement(COAT_COLORS);
  WizardCoatInput.value = randomElement;
  setupWizardCoat.style.fill = randomElement;
};

var changeEyesColor = function () {
  var randomElement = getRandomElement(EYES_COLORS);
  WizardEyesInput.value = randomElement;
  setupWizardEyes.style.fill = randomElement;
};

var changeFireballColor = function () {
  var randomElement = getRandomElement(FIREBALL_COLORS);
  WizardFireballInput.value = randomElement;
  setupWizardFireball.style.backgroundColor = randomElement;
};

setupWizardCoat.addEventListener('click', function () {
  changeCoatColor();
});

setupWizardEyes.addEventListener('click', function () {
  changeEyesColor();
});

setupWizardFireball.addEventListener('click', function () {
  changeFireballColor();
});
