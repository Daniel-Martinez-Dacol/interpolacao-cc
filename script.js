"use strict";

var canvas = document.getElementById("tela");
var ctx = canvas.getContext("2d");

var pontos = [];
pontos.push({ x: 20, y: 20, r: 255, g: 0, b: 0 });
pontos.push({ x: 580, y: 20, r: 0, g: 255, b: 0 });
pontos.push({ x: 580, y: 480, r: 255, g: 0, b: 255 });
pontos.push({ x: 20, y: 480, r: 255, g: 255, b: 0 });

var lado = 5;

function desenhar() {
  for (let p of pontos) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.fillStyle = "rgb(" + p.r + "," + p.g + "," + p.b + ")";
    ctx.fillRect(-lado / 2, -lado / 2, lado, lado);
    ctx.restore();
  }

  requestAnimationFrame(desenhar);
}

requestAnimationFrame(desenhar);

function BilinearInt(xm, ym) {
  var maxx = pontos[1].x - pontos[0].x;

  var dx = (xm - pontos[0].x) / maxx;
  var ex = 1 - dx;
//vermei
  var rc = pontos[0].r * ex + pontos[1].r * dx;
  var rb = pontos[3].r * ex + pontos[2].r * dx;
//verdi
  var gc = pontos[0].g * ex + pontos[1].g * dx;
  var gb = pontos[3].g * ex + pontos[2].g * dx;
//azu
  var bc = pontos[0].b * ex + pontos[1].b * dx;
  var bb = pontos[3].b * ex + pontos[2].b * dx;

  var maxy = pontos[3].y - pontos[0].y;
  var by = (ym - pontos[0].y) / maxy;
  var ty = 1 - by;

  var rm = Math.round(rc * ty + rb * by);
  var gm = Math.round(gc * ty + gb * by);
  var bm = Math.round(bc * ty + bb * by);


  return { x: xm, y: ym, r: rm, g: gm, b: bm };
}

canvas.addEventListener(
  "mousedown",
  function (e) {
    pontos.push(BilinearInt(e.offsetX, e.offsetY));
  },
  false
);