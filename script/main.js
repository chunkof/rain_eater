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

    InitStage();
    MyDef.StartSelectStage();
    //MyDef.PlayStage();
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
    stats.update();
}

}());