enchant();

window.onload = function() {

  var game = new Game(320, 320); // 画面設定
  game.fps = 20; // FPS設定
  game.preload('images/enchant_img/start.png',
               'images/enchant_img/gameover.png',
               'images/enchant_img/clear.png',
               'images/enchant_img/chara1.png',
               'images/enchant_img/chara2.png',
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
      var GROUND_LINE = 223;
      var LEFT_END = 20;
      var RIGTH_END = 170;
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
      kuma.y = GROUND_LINE - kuma.height;
      scene.addChild(kuma);
      var preY = kuma.y;

      var monster_buta = new Sprite(32, 32);
      monster_buta.image = game.assets['images/enchant_img/chara2.png'];
      monster_buta.x = 350;
      monster_buta.y = GROUND_LINE - monster_buta.height;
      monster_buta.visible = true;
      scene.addChild(monster_buta);

      var monster_sirokuma = new Sprite(32, 32);
      monster_sirokuma.image = game.assets['images/enchant_img/chara1.png'];
      monster_sirokuma.frame = 5;
      monster_sirokuma.scaleX = -1;
      monster_sirokuma.x = 300;
      monster_sirokuma.y = GROUND_LINE - monster_sirokuma.height;
      monster_sirokuma.visible = true;
      scene.addChild(monster_sirokuma);

      var blocks = [
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
        [  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
      ];

      var grand = new Map(16, 16);
      grand.image = game.assets['images/enchant_img/map2.png'];
      grand.loadData(blocks);

      var gool = new Sprite(1, 320);
      gool.x = 624;
      gool.y = 0;

      var stage = new Group();
      stage.addChild(gool);
      stage.addChild(grand);
      scene.addChild(stage);
      
      var count = 1;
      scene.addEventListener(Event.ENTER_FRAME, function(){
        var tempy = kuma.y;
        var forcey = 1.0;

        if (game.input.left) {
          kuma.scaleX = -1;
          if (count > 0) {
            if (kuma.x > LEFT_END) {
              kuma.x -= SPEED;
            } else {
              bg.scroll(count);
              count -= SPEED;
              stage.x += SPEED;
              monster_buta.x += SPEED;
              monster_sirokuma.x += SPEED;
            }
          } else {
            if (kuma.x > 0) kuma.x -= SPEED;
          }
          kuma.frame--;
          if (kuma.frame < 0) kuma.frame = 2;
        }
        if (game.input.right) {
          kuma.scaleX = 1;
          if (kuma.x < RIGTH_END) {
            kuma.x += SPEED;
          } else {
            bg.scroll(count);
            count += SPEED;
            stage.x -= SPEED;
            monster_buta.x -= SPEED;
            monster_sirokuma.x -= SPEED;
          }
          kuma.frame++;
          if (kuma.frame > 2) kuma.frame = 0;
        }

        // ジャンプ処理
        if (game.input.up && !jump) {
          forcey = -10.0;
          jump = true;
        }
        kuma.y += (kuma.y - preY) + forcey;
        if(kuma.y > GROUND_LINE - kuma.height) {
          kuma.y = GROUND_LINE - kuma.height;
          jump = false;
        }
        preY = tempy;

        // 衝突判定
        var kuma_center = kuma.x + 16;
        if(kuma.intersect(monster_sirokuma)) {
          if(kuma_center > monster_sirokuma.x && kuma_center < monster_sirokuma.x + monster_sirokuma.width ) {
            monster_sirokuma.frame = 8;
            // Todo:消えるまでに若干時間を持たせたい
            monster_sirokuma.visible = false;
          } else if(monster_sirokuma.frame != 8) {
            kuma.frame = 3;
            game.pushScene(createGameoverScene(scroll));
          }
        }
        if(kuma.intersect(monster_buta)) {
          if(kuma_center > monster_buta.x && kuma_center < monster_buta.x + monster_buta.width ) {
            monster_buta.visible = false;
          } else if(monster_buta.visible == true) {
            kuma.frame = 3;
            game.pushScene(createGameoverScene(scroll));
          }
        }
        if(kuma.intersect(gool)) {
          game.pushScene(createGameclearScene(scroll));
        }

        // 敵の処理
        if (monster_buta.visible == true) {
          monster_buta.x -= 2;
          if (monster_buta.x%4 == 0) monster_buta.frame++;
        }
        if (monster_sirokuma.frame != 8) {
          monster_sirokuma.x -= 2;
          if (monster_sirokuma.x%4 == 0) {
            monster_sirokuma.frame++;
            if (monster_sirokuma.frame > 7) monster_sirokuma.frame =5;
          }
        }
      });
      return scene;
    };

    
    var createGameoverScene = function(scroll) {

        var scene = new Scene();                                   // 新しいシーンを作る
        scene.backgroundColor = 'rgba(0, 0, 0, 0.5)';              // シーンの背景色を設定

        // ゲームオーバー画像を設定
        var gameoverImage = new Sprite(189, 97);                   // スプライトを作る
        gameoverImage.image = game.assets['images/enchant_img/gameover.png'];  // 画像を設定
        gameoverImage.x = 66;                                      // 横位置調整
        gameoverImage.y = 100;                                     // 縦位置調整
        scene.addChild(gameoverImage);                             // シーンに追加

        return scene;
    };

    var createGameclearScene = function(scroll) {

        var scene = new Scene();                                   // 新しいシーンを作る
        scene.backgroundColor = 'rgba(0, 0, 0, 0.5)';              // シーンの背景色を設定

        // ゲームクリア画像を設定
        var gameoverImage = new Sprite(267, 48);                   // スプライトを作る
        gameoverImage.image = game.assets['images/enchant_img/clear.png'];  // 画像を設定
        gameoverImage.x = 26;                                      // 横位置調整
        gameoverImage.y = 100;                                     // 縦位置調整
        scene.addChild(gameoverImage);                             // シーンに追加

        return scene;
    };

    game.replaceScene(createStartScene());
  };
  game.start();
}
