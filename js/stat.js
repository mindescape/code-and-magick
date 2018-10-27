'use strict';

(function () {
  /* Cloud */
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var CLOUD_COLOR = '#fff';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

  /* Font */
  var FONT_SIZE = 16;
  var FONT_FAMILY = 'PT Mono';
  var FONT_COLOR = '#000';

  /* Text */
  var TEXT_MESSAGES = ['Ура вы победили!', 'Список результатов:'];
  var TEXT_MESSAGES_GAP = 17;

  /* Bar */
  var MAX_BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_OFFSET = 50;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderText = function (ctx) {

    TEXT_MESSAGES.forEach(function (msg, index) {
      ctx.fillText(msg, CLOUD_X + TEXT_MESSAGES_GAP, CLOUD_Y + TEXT_MESSAGES_GAP + FONT_SIZE * ++index);
    });
  };

  var getBarColor = function (bar) {
    return (bar === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + window.utils.getRandomNumber(0, 100) + '%, 44%)';
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

    ctx.font = FONT_SIZE + 'px,' + FONT_FAMILY;
    ctx.fillStyle = FONT_COLOR;

    renderText(ctx);

    var maxTime = window.utils.getMaxArrayElement(times);

    names.forEach(function (player, index, arr) {
      var barHeight = times[index] * MAX_BAR_HEIGHT / maxTime;
      var bottomNameOffset = CLOUD_HEIGHT + CLOUD_Y - TEXT_MESSAGES_GAP;
      var bottomBarOffset = bottomNameOffset - barHeight - FONT_SIZE;
      var leftOffset = CLOUD_X + (CLOUD_WIDTH - arr.length * BAR_WIDTH - (arr.length - 1) * BAR_OFFSET) / 2 + (BAR_WIDTH + BAR_OFFSET) * index;

      ctx.fillStyle = FONT_COLOR;
      ctx.fillText(player, leftOffset, bottomNameOffset);
      ctx.fillText(Math.round(times[index]), leftOffset, bottomBarOffset - FONT_SIZE / 2);

      ctx.fillStyle = getBarColor(player);
      ctx.fillRect(leftOffset, bottomBarOffset, BAR_WIDTH, barHeight);
    });
  };
})();
