'use strict';

var cloud = {
  x: 110,
  y: 10,
  width: 420,
  height: 270,
  color: '#fff'
};

var cloudShadow = {
  x: cloud.x + 10,
  y: cloud.y + 10,
  width: cloud.width,
  height: cloud.height,
  color: 'rgba(0, 0, 0, 0.7)'
};

var bar = {
  height: 150,
  width: 40,
  gap: 50,
};

var getRandomBlue = function () {
  return 'hsl(240, ' + Math.floor(Math.random() * 100) + '%' + ', 50%)';
};

var FONT_GAP = 20;
var UPPER_GAP = 20;
var playerColor = 'rgba(255, 0, 0, 1)';

var drawCloud = function (ctx, object, stroke) {
  var offset = 10;

  ctx.fillStyle = object.color;
  ctx.beginPath();
  ctx.moveTo(object.x, object.y);
  ctx.lineTo(object.x + offset, object.y + (object.height / 2));
  ctx.lineTo(object.x, object.y + object.height);
  ctx.lineTo(object.x + object.width, object.y + object.height);
  ctx.lineTo(object.x + object.width - offset, object.y + (object.height / 2));
  ctx.lineTo(object.x + object.width, object.y);
  ctx.lineTo(object.x, object.y);
  ctx.fill();
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
};

var renderStatistics = function (ctx, names, times) {
  drawCloud(ctx, cloudShadow, false);
  drawCloud(ctx, cloud, true);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 245, 30);
  ctx.fillText('Список результатов:', 235, 45);

  var playerIndex = names.indexOf('Вы');
  var playerTime = playerIndex;
  var saved;

  saved = names[0];
  names[0] = names[playerIndex];
  names[playerIndex] = saved;

  saved = times[0];
  times[0] = times[playerTime];
  times[playerTime] = saved;

  var getBestTime = function () {
    var bestTime = times[0];
    for (var i = 0; i < times.length; i++) {
      if (bestTime < times[i]) {
        bestTime = times[i];
      }
    }

    return bestTime;
  };

  var bestTime = getBestTime();

  var renderPlayerBar = function () {
    var barSize = Math.round((times[0] * bar.height) / bestTime);

    ctx.fillStyle = playerColor;
    ctx.beginPath();
    ctx.moveTo(cloud.x + bar.gap, 230);
    ctx.lineTo((cloud.x + bar.gap) + bar.width, 230);
    ctx.lineTo((cloud.x + bar.gap) + bar.width, 230 - barSize);
    ctx.lineTo(cloud.x + bar.gap, 230 - barSize);
    ctx.lineTo(cloud.x + bar.gap, 230);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.fillText(names[0], cloud.x + bar.gap, cloud.y + bar.gap + bar.height + UPPER_GAP + FONT_GAP);
    ctx.fillText(Math.round(times[0]), cloud.x + bar.gap, 230 - barSize - 10);
  };

  var renderOtherPlayers = function () {
    for (var i = 1; i < names.length; i++) {
      var barSize = Math.round((times[i] * bar.height) / bestTime);

      ctx.fillStyle = getRandomBlue();
      ctx.beginPath();
      ctx.moveTo(cloud.x + bar.gap + (bar.gap + bar.width) * i, 230);
      ctx.lineTo((cloud.x + bar.gap) + bar.width + (bar.gap + bar.width) * i, 230);
      ctx.lineTo((cloud.x + bar.gap) + bar.width + (bar.gap + bar.width) * i, 230 - barSize);
      ctx.lineTo(cloud.x + bar.gap + (bar.gap + bar.width) * i, 230 - barSize);
      ctx.lineTo(cloud.x + bar.gap + (bar.gap + bar.width) * i, 230);
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = '#000';
      ctx.fillText(names[i], cloud.x + bar.gap + (bar.gap + bar.width) * i, cloud.y + bar.gap + bar.height + UPPER_GAP + FONT_GAP);
      ctx.fillText(Math.round(times[i]), cloud.x + bar.gap + (bar.gap + bar.width) * i, 230 - barSize - 10);
    }
  }

  renderPlayerBar();
  renderOtherPlayers();

  // for (var i = 0; i < names.length; i++) {
  //   ctx.fillStyle = getRandomBlue();
  //   ctx.fillRect(cloud.x + bar.gap + (bar.gap + bar.width) * i, cloud.y + bar.gap + UPPER_GAP, bar.width, bar.height);
  //   ctx.fillStyle = '#000';
  //   ctx.fillText(names[i], cloud.x + bar.gap + (bar.gap + bar.width) * i, cloud.y + bar.gap + bar.height + UPPER_GAP + FONT_GAP);
  // }
};
