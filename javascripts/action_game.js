enchant();

window.onload = function() {

  var game = new Game(320, 320); // 画面設定
  game.fps = 20; // FPS設定
  game.preload('images/enchant_img/start.png', 'images/enchant_img/gameover.png', 'images/enchant_img/chara1.png', 'images/enchant_img/avatarBg1.png', 'images/enchant_img/avatarBg2.png', 'images/enchant_img/avatarBg3.png'); // ゲームに使う素材を予め読み込み

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
      var GROUND_LINE = 250;
  
      var scene = new Scene();
  
      var bg = new AvatarBG(0);
      scene.addChild(bg);
  
      var kuma = new Sprite(32, 32);
      kuma.image = game.assets['images/enchant_img/chara1.png'];
      kuma.x = 80;
      kuma.y = GROUND_LINE - kuma.height;
      scene.addChild(kuma);
  
      scene.addEventListener(Event.ENTER_FRAME, function(){
        kuma.frame ++;
        if (kuma.frame > 2) {
            kuma.frame = 0;
        }
      });
      return scene;
    };

    game.replaceScene(createStartScene());
  };
  game.start();
}
