(function() {
    // Class Name
    window.MyDef.StageManager = p = function(spec) {this.initialize(spec);};
    // Parent
    var p;
    p.prototype = new createjs.Container();
    p.prototype._parentInitialize = p.prototype.initialize; p.prototype._parentTick = p.prototype._tick;
    // define
    var remain_color         = "white";
    var remain_color_warning = "red";
    // Initialize
    p.prototype.initialize = function(spec) {
        this._parentInitialize();

        this.stage_name = spec.stage_name;
        // state
        this.isGameOver = false;
        this.waitDispGameOver = false;
        // game mode
        this.gameMode = "ScoreAtack"
        // game info
        this.passedTime     =   0;
        this.remainTime     =  60;
        this.life           = 100;
        this.score          =   0;
        this.goalScore      = 100;
        // remain
        this.remainTimeLabel = new createjs.Text("remain",  "bold 28px Arial", "DarkGray");
        this.remainTimeLabel.textAlign = "center";
        this.remainTimeLabel.x = MyGlobal.stage.canvas.width * 0.9;
        this.addChild(this.remainTimeLabel);
        this.remainTimeText = new createjs.Text(this.remainTime.toFixed(2),  "bold 54px Arial", remain_color);
        this.remainTimeText.y = 24;
        this.remainTimeText.x = MyGlobal.stage.canvas.width * 0.9;
        this.remainTimeText.textAlign = "center";
        this.addChild(this.remainTimeText);
        // passed
        this.passedTimeLabel = new createjs.Text("score",  "bold 22px Arial", "DarkGray");
        this.passedTimeLabel.x = 80;
        this.passedTimeLabel.textAlign = "center";
        this.addChild(this.passedTimeLabel);
        this.passedTimeText = new createjs.Text(this.passedTime.toFixed(2),  "bold 46px Arial", "white");
        this.passedTimeText.y = 24;
        this.passedTimeText.x = 80;
        this.passedTimeText.textAlign = "center";
        this.addChild(this.passedTimeText);
        // self destruct
        this.self_destruct_remain = -1;
        // stage label
        var stage_label = new createjs.Text(this.stage_name,  "bold 38px Arial", "Gray");
        stage_label.y = MyGlobal.stage.height-42;
        stage_label.x = 4;
        stage_label.textAlign = "left";
        this.addChild(stage_label);
    };
    // Method
    p.prototype._tick = function() {
        this._parentTick();
        if (createjs.Ticker.getPaused()){return;}
        this.tickImpl();
    };
    p.prototype.tickImpl = function() {
        // add custom update logic.
        if (this.isGameOver){
            return;
        }
        var sec = 1/(MyDef.fps);
        // remain time
        this.remainTime = Math.max(0, this.remainTime-sec);
        this.remainTimeText.text = this.remainTime.toFixed(2);
        if (10 < this.remainTime){
            this.remainTimeText.color = remain_color;
        }else{
            this.remainTimeText.color = remain_color_warning;
        }
        // passed time
        this.passedTime += sec;
        this.passedTimeText.text = this.passedTime.toFixed(2);
        this._updateGameState();
        
        // debug
        MyDebug.addStr("Time :" + this.passedTime.toFixed(2) + "/" + this.remainTime.toFixed(2));
        MyDebug.addStr("Life :" + this.life);
        MyDebug.addStr("Score:" + this.score + "/" + this.goalScore);
    };
    p.prototype.notifyCollision = function(collision){
        // pop
        var pop = {};
        switch(collision.type){
            case "damage":
                this.remainTime -= 10;
                this.life       -= 10;
                pop = MyGlobal.stage.addChild(new createjs.Text("-10","bold 160px Arial", MyDef.damageColor));
                pop.alpha = 0.7;
                break;
            case "heal":
                this.remainTime += 10;
                this.score      += 10;
                pop = MyGlobal.stage.addChild(new createjs.Text("+10","bold 180px Arial", MyDef.healColor));
                pop.alpha = 0.7;
                break;
            case "healRing":
                this.remainTime +=  5;
                this.score      +=  5;
                pop = MyGlobal.stage.addChild(new createjs.Text("+5","bold 120px Arial", MyDef.healColor));
                pop.alpha = 0.5;
                break;
        }
        pop.x = MyGlobal.player.x;
        pop.y = MyGlobal.player.y;
        pop.textAlign = "center";
        pop._tick = function(){
            this.alpha-=0.02;
            this.y -= 2;
            if (0.01 > this.alpha) {
                MyGlobal.stage.removeChild(this);
            }
        };
        // check game over
        this._updateGameState();
    };
    p.prototype.selfDestruct = function(){
        if (0 == this.remainTime) {
            return; // already dead
        }
        this.self_destruct_remain = this.remainTime;
        this.remainTime = 0;
    };
    p.prototype._updateGameState = function(){
        if ((false == this.isGameOver) && (this.remainTime <= 0)){
            this.remainTime =0;
            this.isGameOver = true;
            this.waitDispGameOver = true;
            MyGlobal.player.dead();
            this.remainTimeText.text = this.remainTime.toFixed(2);

            setTimeout( function() {
                MyGlobal.stageManager._displayGameOver();
            }, 1000);

        }
    };
    p.prototype._displayGameOver = function(){
        var score = this.passedTime;
        score     = Math.floor(score*100)/100;

        var score_str = score.toFixed(2);
        var stage_str = this.stage_name;
        var rank_str  = MyDef.getRank(this.passedTime);
        var stage = MyGlobal.stage;

        var y = 60;
        var tmp = stage.addChild(new MyDef.edged_text(stage_str,  "bold 40px Arial", "white","black",3,"center"));
        tmp.x = MyGlobal.stage.centerX;
        tmp.y = y;y+= 60;

        tmp = stage.addChild(new MyDef.edged_text("Game Over",  "bold 56px Arial", "white","black",3,"center"));
        tmp.x = MyGlobal.stage.centerX;
        tmp.y = y;y+= 100;

        tmp = stage.addChild(new MyDef.edged_text("Score",  "bold 28px Arial", "white","black",2,"center"));
        tmp.textAlign = "center";
        tmp.x = MyGlobal.stage.centerX -100;
        tmp.y = y;y+=25;

        tmp = stage.addChild(new MyDef.edged_text(score_str,  "bold 88px Arial", "white","black",3,"center"));
        tmp.x = MyGlobal.stage.centerX;
        tmp.y = y;y+=92;

        tmp = stage.addChild(new MyDef.edged_text(rank_str,  "bold 28px Arial", "white","black",2,"center"));
        tmp.x = MyGlobal.stage.centerX;
        tmp.y = y;y+=32;

        var self_destruct_str = "";
        if (0 < this.self_destruct_remain)
        {
            self_destruct_str = " self destruct(remain" + this.self_destruct_remain.toFixed(2) +")";

            tmp = stage.addChild(new MyDef.edged_text(self_destruct_str,  "bold 26px Arial", "white","black",2,"center"));
            tmp.x = MyGlobal.stage.centerX;
            tmp.y = y;y+=28;
        }

        // Best Score
        var best_score = MyDef.Data.getStageBestScore(this.stage_name);
        if  ((null !== best_score)&&
             (score > best_score)
            ){
            MyDef.Data.setStageBestScore(this.stage_name, score);

            tmp = stage.addChild(new MyDef.edged_text("Best Score!!!!",  "bold 26px Arial", MyDef.healColor,"black",2,"center"));
            tmp.textAlign = "center";
            tmp.x = MyGlobal.stage.centerX;
            tmp.y = y;
        }

        y = MyGlobal.stage.height-290;

        tmp = stage.addChild(new MyDef.TextButton({text:"Retry(R)",w:180,h:90}));
        tmp .x = MyGlobal.stage.centerX-180-40;
        tmp .y = y;
        tmp .setCallBack(function(){
            createjs.Ticker.setPaused(false);
            MyGlobal.retry();
        });

        tmp  = stage.addChild(new MyDef.TextButton({text:"Back",w:180,h:90}));
        tmp .x = MyGlobal.stage.centerX+40;
        tmp .y = y;
        tmp .setCallBack(function(){
            createjs.Ticker.setPaused(false);
            MyDef.EndGame();
            MyDef.StartSelectStage();
        });

        y += 136;
        tmp = stage.addChild(new MyDef.TextButton({text:"Tweet",w:180,h:90,bg_color:MyDef.healColor}));
        tmp .x = MyGlobal.stage.centerX-90;
        tmp .y = y;
        tmp .setCallBack(function(){
            var url = "http://twitter.com/share"
                +     "?url=http://chunkof.net/rain_eater/"
                +     "&hashtags=RainEater"
                +     "&text="
                +     "[stage:" + stage_str + "]"
                +     " "+score_str+" pt"
                +     "("+rank_str+")."
                +     self_destruct_str
                ;
            window.open( url, "Tweet Rain Eater Score")
        });

        this.waitDispGameOver = false;
    };
}());

