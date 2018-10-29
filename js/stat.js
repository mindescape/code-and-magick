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
  color: 'rgba(0, 0, 0, 0.3)'
};

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

var renderStatistics = function (ctx) {
  drawCloud(ctx, cloudShadow, false);
  drawCloud(ctx, cloud, true);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 245, 30);
  ctx.fillText('Список результатов:', 235, 45);
};
