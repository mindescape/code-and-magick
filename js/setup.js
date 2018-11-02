'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var similarList = document.querySelector('.setup-similar-list');

var names = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var secondNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var wizards = [
  {
    name: getRandomElement(names) + ' ' + getRandomElement(secondNames),
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColors)
  },
  {
    name: getRandomElement(names) + ' ' + getRandomElement(secondNames),
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColors)
  },
  {
    name: getRandomElement(names) + ' ' + getRandomElement(secondNames),
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColors)
  },
  {
    name: getRandomElement(names) + ' ' + getRandomElement(secondNames),
    coatColor: getRandomElement(coatColors),
    eyesColor: getRandomElement(eyesColors)
  }
];

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderSimilarWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderSimilarWizard(wizards[i]));
}
similarList.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');
