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
  y: 230,
  height: 150,
  width: 40,
  gap: 50,
};

var drawCloud = function (ctx, object, stroke) {
  ctx.fillStyle = object.color;
  ctx.beginPath();
  ctx.moveTo(object.x, object.y);
  ctx.lineTo(object.x, object.y + (object.height / 2));
  ctx.lineTo(object.x, object.y + object.height);
  ctx.lineTo(object.x + object.width, object.y + object.height);
  ctx.lineTo(object.x + object.width, object.y + (object.height / 2));
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

  var renderBars = function () {
    var fontGap = 40;
    var statsGap = 10;
    var getRandomBlue = function () {
      return 'hsl(240, ' + Math.floor(Math.random() * 100) + '%' + ', 50%)';
    };

    for (var i = 0; i < names.length; i++) {
      var barSize = Math.round((times[i] * bar.height) / bestTime);

      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      if (i > 0) {
        ctx.fillStyle = getRandomBlue();
      }
      ctx.beginPath();
      ctx.moveTo(cloud.x + bar.gap + (bar.gap + bar.width) * i, bar.y);
      ctx.lineTo((cloud.x + bar.gap) + bar.width + (bar.gap + bar.width) * i, bar.y);
      ctx.lineTo((cloud.x + bar.gap) + bar.width + (bar.gap + bar.width) * i, bar.y - barSize);
      ctx.lineTo(cloud.x + bar.gap + (bar.gap + bar.width) * i, bar.y - barSize);
      ctx.lineTo(cloud.x + bar.gap + (bar.gap + bar.width) * i, bar.y);
      ctx.fill();
      ctx.closePath();
      ctx.fillStyle = '#000';
      ctx.fillText(names[i], cloud.x + bar.gap + (bar.gap + bar.width) * i, cloud.y + bar.gap + bar.height + fontGap);
      ctx.fillText(Math.round(times[i]), cloud.x + bar.gap + (bar.gap + bar.width) * i, bar.y - barSize - statsGap);
    }
  };

  renderBars();
};
