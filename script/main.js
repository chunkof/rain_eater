var MyGlobal = [];
(function() {
"use strict";
MyGlobal.stage = [];
MyGlobal.player = [];
var stats =[];
window.OnLoad = function() {
    stats = new Stats();stats.setMode( 0 );
    stats.domElement.style.position = 'relative';
    var objMain = document.getElementById('stats');
    objMain.appendChild( stats.domElement );

    loadSound();
    InitStage();
    MyDef.StartSelectStage();
}

function loadSound () {
//  createjs.Sound.registerSound("sound/se_maoudamashii_system38.mp3", "collision");
//  createjs.Sound.registerSound("sound/se_maoudamashii_system49.mp3", "gain");
  createjs.Sound.registerSound("sound/damage5.mp3", "collision");
  createjs.Sound.registerSound("sound/damage4.mp3", "damage");
  createjs.Sound.registerSound("sound/coin05.mp3",  "gain");
  createjs.Sound.registerSound("sound/destruction1.mp3", "destruction");
  createjs.Sound.registerSound("sound/handy_lasergun.mp3", "accele");
}


var InitStage = function(){
    var canvas = document.getElementById("canvas");

    canvas.style.backgroundColor = MyDef.bgColor;
    var stage = MyGlobal.stage = new createjs.Stage(canvas);
    stage.width  = stage.canvas.width;
    stage.height = stage.canvas.height;
    stage.centerX = stage.canvas.width  /2;
    stage.centerY = stage.canvas.height /2;
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }

    // ticker
    createjs.Ticker.setFPS(MyDef.fps);
    createjs.Ticker.addEventListener("tick", tick);
};

var tick =function(event) {
    MyGlobal.stage.update(event);

    MyDebug.dispStr();
    MyDebug.clearStr();

    stats.update();
}

}());