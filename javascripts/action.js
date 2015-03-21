var SCREEN_SIZE = 400;                    // �L�����o�X�̕�
var FPS = 200;                             // �t���[�����[�g
var canvas;                               //= document.getElementById('world');
var context;                              //= canvas.getContext('2d');

var GRAUND = SCREEN_SIZE - 10; // �n��
// ���@�����ʒu
var x = 0;
var y = GRAUND;

$(function() {
  canvas = document.getElementById('world'); // canvas�v�f���擾
  context = canvas.getContext('2d');                // �R���e�L�X�g
  context.fillStyle = "#00ff00";          // �F
  context.beginPath();
  window.addEventListener ('keydown' , keydownfunc , true);
  timer = setInterval('loop()',1000/FPS);
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
    if (y<GRAUND) {
      y += 5;
    } else {
      y = GRAUND;
    }
    break;
  }
}

function loop() {
  context.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);
  stage();
  hero();
}

function hero() {
  context.fillRect(x, y-10, 10, 10);
}

function stage() {
  context.strokeStyle = "#00ff00";
  context.beginPath();
  context.moveTo(0, GRAUND);
  context.lineTo(SCREEN_SIZE, GRAUND);
  context.closePath();
  context.stroke();

}