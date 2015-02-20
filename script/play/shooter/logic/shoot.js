(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Object Name
    MyDef.logic.Shoot = p;
    // Initialize
    p.prototype.initialize = function(spec) {
        this.interval    = spec.interval;
        this.shots       = spec.shots;
        this.interval_remain = this.interval;
        this.shotsper_total  = this._getShotsPerTotal(this.shots);
        this.shotsper_remain = 0;
        this._remakeRemainPer();
    };
    // Execute
    p.prototype.execute = function(owner) {
        if (true == MyGlobal.stageManager.isGameOver){
            return;}
        // interval
        if (0 < this.interval_remain){
            --this.interval_remain;
            return;
        }
        this.interval_remain = this.interval;

        // shot
        var number = this._getShotsPerNumber();
        var current = 0;
        var target = null;
        jQuery.each(this.shots,function(i, shot){
            current += shot.remain_per;
            if (number >= current){
                return true;
            }
            target = shot;
            shot.remain_per-=1;

            return false;
         });
        if (null === target){
            console.log("cannot specify");
            return;
        }

        this.shotsper_remain-=1;
        if (1 > this.shotsper_remain)
        {
            this._remakeRemainPer();
        }

        // execute
        this._executeShot(owner, target);
    };
    p.prototype._executeShot = function(owner, shot){
        var speed = MyUt.GetValue(shot.speed);
        var ball = MyGlobal.stage.addChild(new MyDef.Ball(shot.spec));
        ball.x  = owner.x;
        ball.y  = owner.y;
        ball.vX = owner.aim_vX*speed;
        ball.vY = owner.aim_vY*speed;
    };
    p.prototype._getShotsPerTotal = function(shots){
        var total = 0;
        _.each(shots, function(shot){
            total += shot.per;
        });

        return total;
    };
    p.prototype._getShotsPerNumber = function (){
        var value =  MyUt.RndRangeFloor(0, this.shotsper_remain-1);
        return value;
    };
    p.prototype._remakeRemainPer = function (){
        jQuery.each(this.shots,function(i, shot){
            shot.remain_per = shot.per;
        });
        this.shotsper_remain = this.shotsper_total;
    }
}());
