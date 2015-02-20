(function() {
    "use strict";
var StartGame = MyDef.StartGame = function(stage_name){
    var stage = MyGlobal.stage;
    // set up sysytem method
    MyGlobal.retry = Retry;
    MyGlobal.current_stage_name = stage_name;
    // MyDef obj
    var player = MyGlobal.player = stage.addChild(new MyDef.PlayerBall());
    player.x = stage.centerX;
    player.y = stage.centerY;
    var border1 = stage.addChild(new MyDef.Border({
        x:stage.centerX, y:stage.centerY
        , rad:  360, color:  MyDef.objectColor
        , rad2: 380, color2: MyDef.objectColor
    }));

    // shooter
    var tmp={};
    var tmp1={};var tmp2={};var tmp3={};var tmp4={};
    var tmp_speed =0;
    var shooter = MyDef.CircularShooter;
    var logic   = MyDef.ConstantShooter;

    switch(stage_name)
    {
    case "A-1":
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  0}));
            tmp.logics.push(new MyDef.logic.Move(0.5));
            tmp.logics.push(new MyDef.logic.AimTarget(player));
            tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.3,shots:[
                    {per: 92, speed:1.3,spec:{type:"reflect", rad:7.5}},
                    {per:  8, speed:0.6,spec:{type:"heal",    rad:7.5}}
                ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  90}));
        tmp.logics.push(new MyDef.logic.Move(0.5));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.3, shots:[
                    {per: 92, speed:1.3,spec:{type:"damage",  rad:7.5}},
                    {per:  8, speed:0.6,spec:{type:"heal",    rad:7.5}}
            ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:270}));
        tmp.logics.push(new MyDef.logic.Move(0.5));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.3, shots:[
                    {per: 92, speed:1.3,spec:{type:"damage",  rad:7.5, ringMargin:20}},
                    {per:  8, speed:0.6,spec:{type:"heal",    rad:7.5}}
            ]}));
        break;
    case "A-2":
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  0}));
        tmp.logics.push(new MyDef.logic.Move(0.5));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.2+1,shots:[
            {per: 97, speed:1.3,spec:{type:"damage", rad:7.5}},
            {per:  3, speed:0.7,spec:{type:"heal"  , rad:7.5}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  90}));
        tmp.logics.push(new MyDef.logic.Move(0.5));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.2+0, shots:[
            {per: 97, speed:1.3,spec:{type:"damage", rad:7.5}},
            {per:  3, speed:0.7,spec:{type:"heal"  , rad:7.5}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:180}));
        tmp.logics.push(new MyDef.logic.Move(0.5));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.2-1, shots:[
            {per: 96, speed:1.3,spec:{type:"damage", rad:7.5}},
            {per:  4, speed:0.7,spec:{type:"heal"  , rad:7.5}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:270}));
        tmp.logics.push(new MyDef.logic.Move(0.5));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.2-2, shots:[
            {per: 96, speed:1.3,spec:{type:"damage", rad:7.5}},
            {per:  4, speed:0.7,spec:{type:"heal"  , rad:7.5}}
        ]}));
        break;
    case "B-2":
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  0}));
        tmp.logics.push(new MyDef.logic.Move(0.8));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.7+1, shots:[
            {per: 97, speed:1.3, spec:{type:"damage", rad:7.5}},
            {per:  3, speed:0.7, spec:{type:"heal"  , rad:7.5}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree: 20}));
        tmp.logics.push(new MyDef.logic.Move(0.8));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.7+1, shots:[
            {per: 97, speed:1.3, spec:{type:"damage", rad:7.5}},
            {per:  3, speed:0.7, spec:{type:"heal"  , rad:7.5}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree: 60}));
        tmp.logics.push(new MyDef.logic.Move(0.8));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.7-1, shots:[
            {per: 97, speed:1.3, spec:{type:"damage", rad:7.5}},
            {per:  3, speed:0.7, spec:{type:"heal"  , rad:7.5}}
        ]}));
        break;
    case "C-3":
        var c_3_ball_rad = function(){
            return MyUt.RndRangeFloor(5,34);
        };
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  0}));
        tmp.logics.push(new MyDef.logic.Move(0.7));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.2+0,shots:[
            {per: 96, speed:1.3, spec:{type:"damage", rad:c_3_ball_rad}},
            {per:  4, speed:0.7, spec:{type:"heal"  , rad:c_3_ball_rad}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  90}));
        tmp.logics.push(new MyDef.logic.Move(0.7));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.2+1, shots:[
            {per: 96, speed:1.3, spec:{type:"damage", rad:c_3_ball_rad}},
            {per:  4, speed:0.7, spec:{type:"heal"  , rad:c_3_ball_rad}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:180}));
        tmp.logics.push(new MyDef.logic.Move(0.7));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.1+0, shots:[
            {per: 96, speed:1.3, spec:{type:"damage", rad:c_3_ball_rad}},
            {per:  4, speed:0.7, spec:{type:"heal"  , rad:c_3_ball_rad}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:270}));
        tmp.logics.push(new MyDef.logic.Move(0.7));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.1+1, shots:[
            {per: 96, speed:1.3, spec:{type:"damage", rad:c_3_ball_rad}},
            {per:  4, speed:0.7, spec:{type:"heal"  , rad:c_3_ball_rad}}
        ]}));
        break;
    case "labo":
        tmp = new MyDef.NumberBallManager();
        tmp.pushBack({x:200,y:400});
        tmp.pushBack({x:600,y:300});
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  0}));
            tmp.logics.push(new MyDef.logic.Move(0.5));
            tmp.logics.push(new MyDef.logic.AimTarget(player));
            tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.3,shots:[
                    {per:100, speed:1.3,spec:{type:"damage", rad:7.5}}
                ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  90}));
        tmp.logics.push(new MyDef.logic.Move(0.5));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.3, shots:[
                    {per:100, speed:1.3,spec:{type:"damage", rad:7.5}}
            ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:270}));
        tmp.logics.push(new MyDef.logic.Move(0.5));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.3, shots:[
                    {per:100, speed:1.3,spec:{type:"reflect", rad:7.5}}
            ]}));
        break;
    case "labo_":
        var c_3_ball_rad = function(){
            return MyUt.RndRangeFloor(5,34);
        };
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  0}));
        tmp.logics.push(new MyDef.logic.Move(0.7));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.2+0,shots:[
            {per: 96, speed:1.3, spec:{type:"reflect", rad:c_3_ball_rad, ringMargin:20}},
            {per:  4, speed:0.7, spec:{type:"heal"  ,  rad:c_3_ball_rad}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  90}));
        tmp.logics.push(new MyDef.logic.Move(0.7));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.2+1, shots:[
            {per: 96, speed:1.3, spec:{type:"reflect", rad:c_3_ball_rad}},
            {per:  4, speed:0.7, spec:{type:"heal"  ,  rad:c_3_ball_rad}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:180}));
        tmp.logics.push(new MyDef.logic.Move(0.7));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.1+0, shots:[
            {per: 96, speed:1.3, spec:{type:"reflect", rad:c_3_ball_rad}},
            {per:  4, speed:0.7, spec:{type:"heal"  ,  rad:c_3_ball_rad}}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:270}));
        tmp.logics.push(new MyDef.logic.Move(0.7));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.1+1, shots:[
            {per: 96, speed:1.3, spec:{type:"reflect", rad:c_3_ball_rad}},
            {per:  4, speed:0.7, spec:{type:"heal"  ,  rad:c_3_ball_rad}}
        ]}));
        break;
        break;
    case "labo_2_3": // pattern lv2 or 3
        tmp_speed = 2.8;
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  0}));
        tmp.logics.push(new MyDef.logic.Move(0.1));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.9,shots:[
            {per: 93, type:"damage", speed:tmp_speed, rad:7.5},
            {per:  7, type:"heal"  , speed:tmp_speed, rad:7.5}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  30}));
        tmp.logics.push(new MyDef.logic.Move(0.1));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.9+1,shots:[
            {per:100, type:"damage", speed:tmp_speed, rad:7.5},
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree: 60}));
        tmp.logics.push(new MyDef.logic.Move(0.1));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.3,shots:[
            {per:100, type:"damage", speed:tmp_speed,rad:7.5}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  180}));
        tmp.logics.push(new MyDef.logic.Move(0.1));
        tmp.logics.push(new MyDef.logic.AimTarget(player));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.9+2,shots:[
            {per: 93, type:"damage", speed:tmp_speed, rad:7.5},
            {per:  7, type:"heal"  , speed:tmp_speed, rad:7.5}
        ]}));
        break;
    case "labo_": // pattern lv1
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:180}));
        tmp.logics.push(new MyDef.logic.Move(0.01));
        tmp.logics.push(new MyDef.logic.AimAngle({start:-75, end:75, add_abs:0.4}));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.8+1,shots:[
            {per: 93, type:"damage", speed:1.2, rad:7.5},
            {per:  7, type:"heal"  , speed:1.2, rad:7.5}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:90}));
        tmp.logics.push(new MyDef.logic.Move(0.01));
        tmp.logics.push(new MyDef.logic.AimAngle({start: 75, end:-75, add_abs:0.4}));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.8+1,shots:[
            {per: 93, type:"damage", speed:1.2, rad:7.5},
            {per:  7, type:"heal"  , speed:1.2, rad:7.5}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:  0}));
        tmp.logics.push(new MyDef.logic.Move(0.01));
        tmp.logics.push(new MyDef.logic.AimAngle({start:-75, end:75, add_abs:0.4}));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.8+2,shots:[
            {per: 93, type:"damage", speed:1.2, rad:7.5},
            {per:  7, type:"heal"  , speed:1.2, rad:7.5}
        ]}));
        tmp = stage.addChild(new MyDef.Shooter({circle:border1, degree:270}));
        tmp.logics.push(new MyDef.logic.Move(0.01));
        tmp.logics.push(new MyDef.logic.AimAngle({start: 75, end:-75, add_abs:0.4}));
        tmp.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.8+2,shots:[
            {per: 93, type:"damage", speed:1.2, rad:7.5},
            {per:  7, type:"heal"  , speed:1.2, rad:7.5}
        ]}));
        break;
    case "laboC": //candidta chunk level3
        tmp1 = stage.addChild(new MyDef.Shooter({circle:border1, degree:  0}));
        tmp1.logics.push(new MyDef.logic.Move(0.02));
        tmp1.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*2.6+1,shots:[
            {per: 100, type:"damage", speed:1.0, rad:24}
        ]}));
        tmp2 = stage.addChild(new MyDef.Shooter({circle:border1, degree: 90}));
        tmp2.logics.push(new MyDef.logic.Move(0.2));
        tmp2.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*8, shots:[
            {per: 100, type:"heal", speed:0.7, rad:7.5}
        ]}));
        tmp3 = stage.addChild(new MyDef.Shooter({circle:border1, degree:270}));
        tmp3.logics.push(new MyDef.logic.Move(0.02));
        tmp3.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*2.6-1, shots:[
            {per: 100, type:"damage", speed:1.0, rad:24}
        ]}));
        tmp4 = stage.addChild(new MyDef.Shooter({circle:border1, degree:110}));
        tmp4.logics.push(new MyDef.logic.Move(-0.8));
        tmp4.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*0.7+0, shots:[
            {per: 100, type:"damage", speed:1.6, rad:7.5}
        ]}));
        tmp1.logics.push(new MyDef.logic.AimTarget({x:stage.centerX, y:stage.centerY}));
        tmp2.logics.push(new MyDef.logic.AimTarget({x:stage.centerX, y:stage.centerY}));
        tmp3.logics.push(new MyDef.logic.AimTarget({x:stage.centerX, y:stage.centerY}));
        tmp4.logics.push(new MyDef.logic.AimTarget(player));
        break;
    case "labo1"://speed level2
        tmp1 = stage.addChild(new MyDef.Shooter({circle:border1, degree:  0}));
        tmp1.logics.push(new MyDef.logic.Move(0.1));
        tmp1.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.1+1,shots:[
            {per: 95, type:"damage", speed:3.0, rad:7.5},
            {per:  5, type:"heal"  , speed:1.0, rad:7.5}
        ]}));
        tmp2 = stage.addChild(new MyDef.Shooter({circle:border1, degree:  90}));
        tmp2.logics.push(new MyDef.logic.Move(0.3));
        tmp2.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.1+0, shots:[
            {per: 95, type:"damage", speed:3.0, rad:7.5},
            {per:  5, type:"heal"  , speed:1.0, rad:7.5}
        ]}));
        tmp3 = stage.addChild(new MyDef.Shooter({circle:border1, degree:180}));
        tmp3.logics.push(new MyDef.logic.Move(0.6));
        tmp3.logics.push(new MyDef.logic.Shoot({interval: MyDef.fps*1.1-1, shots:[
            {per: 95, type:"damage", speed:3.0, rad:7.5},
            {per:  5, type:"heal"  , speed:1.0, rad:7.5}
        ]}));
        tmp1.logics.push(new MyDef.logic.AimTarget(player));
        tmp2.logics.push(new MyDef.logic.AimTarget(player));
        tmp3.logics.push(new MyDef.logic.AimTarget(player));
        break;
    }

    // stage manager
    var manager = MyGlobal.stageManager = stage.addChild(new MyDef.StageManager({stage_name:stage_name}));
    manager.y = 0;
    manager.x = 0;

    // dead button
    var dead_button = MyGlobal.stage.addChild(CreateDestroyButton());
    dead_button.x = 52;
    dead_button.y = 124;

    // pause button
    var pause_button = MyGlobal.stage.addChild(new MyDef.PauseButton());
    pause_button.x = MyGlobal.stage.width-52;
    pause_button.y = 124;

    // key events
    document.addEventListener('keypress', handleKeyDown, false);
    document.addEventListener('keyup',    handleKeyUp,   false);
    stage.addEventListener("stagemousedown", handleKeyDown, false);
    stage.addEventListener("stagemouseup", handleKeyUp, false);
};
var CreateDestroyButton = function(){
    var btn = new MyDef.Button();
    var rad          = 46;
    var stroke_width = 6;
    btn.graphics.beginFill(MyDef.bgColor).drawCircle(0,0,rad);
    btn.graphics.beginStroke("gray").setStrokeStyle(stroke_width).drawCircle(0, 0, rad);
    var size = 16;//cross line size
    btn.graphics.beginStroke(MyDef.eaterColor);
    btn.graphics.moveTo(-size, -size);
    btn.graphics.lineTo(+size, +size);
    btn.graphics.moveTo(+size, -size);
    btn.graphics.lineTo(-size, +size);

    btn.setCallBack(function(){
        createjs.Ticker.setPaused(false);
        MyGlobal.stageManager.selfDestruct();
        });
    var rad_m = rad + stroke_width;
    btn.cache(-rad_m,-rad_m,rad_m*2,rad_m*2);

    return btn;
};

var EndGame = MyDef.EndGame = function(){
    var stage = MyGlobal.stage;
    document.removeEventListener('keypress', handleKeyDown, false);
    document.removeEventListener('keyup',    handleKeyUp,   false);
    stage.removeAllEventListeners();
    stage.removeAllChildren();
};
var Retry = function(){
    EndGame();
    setTimeout( function() {
        StartGame(MyGlobal.current_stage_name);
    }, 0);
};

var handleKeyDown = function(evt){
    var keyChar = String.fromCharCode(evt.which).toUpperCase();
    if ('R' == keyChar){
        var stage_manager = MyGlobal.stageManager;
        if (true == stage_manager.isGameOver){
            if (false == stage_manager.waitDispGameOver){
                MyGlobal.retry();

                return;
            }
        }
    }

    MyGlobal.player.accele();
};
var handleKeyUp= function(){
    MyGlobal.player.idle()
};

var handleClick= function(e){
    MyDef.touchShooter.shot(e);
};

}());