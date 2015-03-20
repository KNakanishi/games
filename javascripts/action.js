var SCREEN_SIZE = 400;                    // �L�����o�X�̕�
var FPS = 10;                             // �t���[�����[�g
var canvas;                               //= document.getElementById('world');
var context;                              //= canvas.getContext('2d');
var x = 0;
var y = SCREEN_SIZE;

$(function() {
  canvas = document.getElementById('world'); // canvas�v�f���擾
  context = canvas.getContext('2d');                // �R���e�L�X�g
  context.fillStyle = 'rgb(0, 255, 0)';          // �F
  context.beginPath();
  window.addEventListener ('keydown' , keydownfunc , true);
  timer = setInterval('hero()',1000/FPS);
});

function keydownfunc (event) {
  var code = event.keyCode;
  switch (code) {
  case 37:
    if (x>0) {
      x -= 5;
    } else {
      x = 0;
    }
    break;
  case 38:
    if (y>0) {
      y -= 5;
    } else {
      y = 0;
    }
    break;
  case 39:
    if (x<SCREEN_SIZE) {
      x += 5;
    } else {
      x = SCREEN_SIZE;
    }
    break;
  case 40:
    if (y<SCREEN_SIZE) {
      y += 5;
    } else {
      y = SCREEN_SIZE;
    }
    break;
  }
}

function hero() {
    context.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);
    context.fillRect(x, y-10, 10, 10);
    console.log(x);
    console.log(SCREEN_SIZE);
    console.log(y);
}