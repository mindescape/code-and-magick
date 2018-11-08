'use strict';

var NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

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

var showSetupDOM = function () {
  var setup = document.querySelector('.setup');
  setup.classList.remove('hidden');
};

var showSetupSimilarDOM = function () {
  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');
};

showSetupDOM();
var wizardsData = generateWizardsData();
renderSimilarWizards(wizardsData);
showSetupSimilarDOM();
