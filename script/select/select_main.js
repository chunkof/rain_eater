(function() {
    "use strict";
    var StartSelect = MyDef.StartSelectStage = function(){
        var stage = MyGlobal.stage;

        var xlane1= 10;
        var xlane2= 30;
        var xlane3= 180;
        var playerX = 540;
        var playerY = 180;
        var game_color        = MyDef.healColor;
        var game_color_shadow = MyDef.healColorShadow;
        var base_color = "white";

        var border1 = stage.addChild(new MyDef.Border({
            x:playerX, y:playerY
            , rad:  170, color: "gray"
            , rad2: 190, color2:"gray"
        }));

        var tmp;
        tmp = stage.addChild(new createjs.Text("Rain Eater",  "bold 52px Arial", game_color));
        tmp.x = xlane1;
        tmp.y = 10;


        var plusY =90;
        tmp = stage.addChild(new MyDef.edged_text("Jet:",  "bold 36px Arial", MyDef.eaterColor, MyDef.eaterColorShadow));
        tmp.x =  xlane2;
        tmp.y = plusY;
        MyGlobal.player = tmp = stage.addChild(new MyDef.PlayerBall());
        tmp.x = playerX;
        tmp.y = playerY;
        tmp = stage.addChild(new MyDef.edged_text("Press Any Area (Click or Tap).",  "bold 28px Arial", MyDef.eaterColor, MyDef.eaterColorShadow));
        tmp.x = xlane3-30;
        tmp.y = plusY+5;
        tmp = stage.addChild(new MyDef.edged_text("Press Any Key.",  "bold 28px Arial", MyDef.eaterColor, MyDef.eaterColorShadow));
        tmp.x = xlane3-30;
        tmp.y = plusY+40;

        plusY =210;
        tmp = stage.addChild(new MyDef.edged_text("Rule:",  "bold 36px Arial", base_color));
        tmp.x =  xlane2;
        tmp.y = plusY;

        tmp = stage.addChild(new MyDef.Ball({type:MyDef.Ball.Type.DAMAGE, rad:12}));
        tmp.x = xlane3;
        tmp.y = plusY+20;
        tmp._tick = function(){};
        tmp = stage.addChild(new MyDef.edged_text("-10s",  "bold 28px Arial", base_color));
        tmp.x = xlane3+30;
        tmp.y = plusY+5;

        tmp = stage.addChild(new MyDef.Ball({type:MyDef.Ball.Type.HEAL, rad:12}));
        tmp.x = xlane3 + 140;
        tmp.y = plusY+20;
        tmp._tick = function(){};
        tmp = stage.addChild(new MyDef.edged_text("+10s",  "bold 28px Arial",game_color));
        tmp.x = xlane3+30+ 140;
        tmp.y = plusY+5;




        tmp = stage.addChild(new MyDef.StageButton({bg_color:game_color, text:"A-1", text_color:"black", call_back:ChooseStage}));
        tmp.x = stage.width *0.2;
        tmp.y = 420;

        tmp = stage.addChild(new MyDef.StageButton({bg_color:game_color, text:"A-2", text_color:"black", call_back:ChooseStage}));
        tmp.x = stage.width /2;
        tmp.y = 420;

        tmp = stage.addChild(new MyDef.StageButton({bg_color:game_color, text:"B-2", text_color:"black", call_back:ChooseStage}));
        tmp.x = stage.width*0.8;
        tmp.y = 420;

        tmp = stage.addChild(new MyDef.StageButton({bg_color:game_color, text:"C-3", text_color:"black", call_back:ChooseStage}));
        tmp.x = stage.width*0.2;
        tmp.y = 600;

        tmp = stage.addChild(new MyDef.StageButton({bg_color:game_color, text:"labo", text_color:"black", call_back:ChooseStage}));
        tmp.x = stage.width*0.5;
        tmp.y = 600;

        var h_size = 28;
        tmp = stage.addChild(new createjs.Text("Over   60pt: Good",  "22px Arial", "gray"));
        tmp.x = stage.width - 220;
        tmp.y = stage.height-h_size*3;
        tmp = stage.addChild(new createjs.Text("Over 100pt: Great",  "22px Arial", "gray"));
        tmp.x = stage.width - 220;
        tmp.y = stage.height-h_size*2;
        tmp = stage.addChild(new createjs.Text("Over 150pt: Master",  "22px Arial", "gray"));
        tmp.x = stage.width - 220;
        tmp.y = stage.height-h_size;



        // key events
        document.addEventListener('keypress', handleKeyDown, false);
        document.addEventListener('keyup',    handleKeyUp,   false);
        stage.addEventListener("stagemousedown", handleKeyDown, false);
        stage.addEventListener("stagemouseup", handleKeyUp, false);

    };

    var EndSelect = function(){
        var stage = MyGlobal.stage;
        document.removeEventListener('keypress', handleKeyDown, false);
        document.removeEventListener('keyup',    handleKeyUp,   false);
        stage.removeAllEventListeners();
        stage.removeAllChildren();
    };

    var ChooseStage = function(stage_name){
        EndSelect();
        MyDef.StartGame(stage_name);
    };

    var handleKeyDown = function(evt){
        MyGlobal.player.accele();
    };
    var handleKeyUp= function(){
        MyGlobal.player.idle()
    };

}());