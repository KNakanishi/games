enchant();

window.onload = function() {

  var game = new Game(320, 320); // 画面設定
  game.fps = 20; // FPS設定
  game.preload('images/enchant_img/start.png',
               'images/enchant_img/gameover.png',
               'images/enchant_img/chara1.png',
               'images/enchant_img/avatarBg1.png',
               'images/enchant_img/avatarBg2.png',
               'images/enchant_img/avatarBg3.png',
               'images/enchant_img/map2.png'); // ゲームに使う素材を予め読み込み
  var IMAGE_PATH = "images/enchant_img/"

  game.onload = function() { // ゲームメイン処理
    var createStartScene = function() {
      var scene = new Scene();
      scene.backgroundColor = '#fcc800';
  
      var startImage = new Sprite(236, 48);
      startImage.image = game.assets['images/enchant_img/start.png'];
      startImage.x = 42;
      startImage.y = 157;
      scene.addChild(startImage);
  
      startImage.addEventListener(Event.TOUCH_START, function(e) {
        game.replaceScene(createGameScene());
      });
  
      return scene;
    };
  
    var createGameScene = function() {
      var GROUND_LINE = 190;
      var SPEED = 4;
      var jump = false;
  
      var scene = new Scene();

      for (var i=1; i<=3; ++i) game.assets["avatarBg"+i+".png"] = game.assets[IMAGE_PATH + "avatarBg"+i+".png"];

      var bg = new AvatarBG(1);
      bg.y = 50;
      scene.addChild(bg);
  
      var kuma = new Sprite(32, 32);
      kuma.image = game.assets['images/enchant_img/chara1.png'];
      kuma.x = 80;
      kuma.y = GROUND_LINE;
      scene.addChild(kuma);
      var preY = kuma.y;

      scene.addEventListener(Event.ENTER_FRAME, function(){
        var tempy = kuma.y;
        var forcey = 1.0;

        if (game.input.left) {
          kuma.x -= SPEED;
          kuma.frame--;
          if (kuma.frame < 0) kuma.frame = 2;
        }
        if (game.input.right) {
          kuma.x += SPEED;
          kuma.frame++;
          if (kuma.frame > 2) kuma.frame = 0;
        }

        // ジャンプ処理
        if (game.input.up && !jump) {
          forcey = -10.0;
          jump = true;
        }
        kuma.y += (kuma.y - preY) + forcey;
        if(kuma.y > GROUND_LINE) {
          kuma.y = GROUND_LINE;
          jump = false;
        }
        preY = tempy;
      });
      return scene;
    };

    game.replaceScene(createStartScene());
  };
  game.start();
}
