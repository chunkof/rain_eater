(function () {
    "use strict";
    // Class Name
    var p;
    MyDef.PlayerBall = p = function () {
        this.initialize();
    };
    // Parent
    var _base = createjs.Shape;
    p.prototype = new _base();
    // def
    var Action = {
        IDLE  :  0,
        ACCELE:  1,
        DUMMY : -1
    };
    var State = {
        IDLE  : 0,
        DAMAGE: 1,
        HEAL:   2,
        FINISH: 3
    };
    var airRegist = 0.995;
    p.prototype.initialize = function () {
        _base.prototype.constructor.call(this);
        // Initialize
        this.vX = 0;
        this.vY = 0;
        this.actionWait = 0;
        this.actionType = Action.IDLE;
        this.vRotation = 8;
        // state
        this.state     = State.IDLE;
        this.stateRemainCount = 0;
        this.stateCount       = 0;
        this.isDead           = false;
        // shape setting
        this.rad = 18;
        this.pipe_len = 52;
        this.pipe_bold = 8;
        this.drawShapeIdle();
    };
    p.prototype.drawShapeIdle = function(){
        if (0 != this.stateCount){
            return;
        }

        this.drawShapeImpl(MyDef.eaterColorShadow, MyDef.eaterColor);
    };
    p.prototype.drawShapeDamage = function(){
        if (0 == this.stateCount){
            this.graphics.clear();
        }
        if (4 == this.stateCount){
            this.drawShapeImpl(MyDef.eaterColorShadow, MyDef.eaterColor);
        }
    };
    p.prototype.drawShapeHeal = function(){
        if (0 != this.stateCount){
            return;
        }
        this.drawShapeImpl(MyDef.healColorShadow, MyDef.healColor);
    };
    p.prototype.drawShapeImpl = function(bg_color, fg_color){
        this.uncache();
            this.graphics.clear();
            // edge
            var rad = this.rad;
            this.graphics.beginFill(fg_color)
                .beginStroke(bg_color).setStrokeStyle(1)
                .drawCircle(0, 0, rad+0.3).endStroke();

            this.graphics.beginFill(bg_color).drawCircle(0, 0, rad*0.7);
            //pipe
            var bold = this.pipe_bold;
            var len = this.pipe_len;
            this.graphics.beginFill(fg_color)
                .beginStroke(bg_color).setStrokeStyle(1)
                .drawRect(0, -(bold / 2), len, bold).endStroke();
            // core
            this.graphics.beginFill(fg_color).drawCircle(0, 0, rad*0.5);
            this.graphics.beginFill(bg_color).drawCircle(0, 0, rad*0.2);

    };
    p.prototype.isHittable = function () {
        if (this.isDead){
            return false;
        }
        return ((State.IDLE == this.state)||(State.HEAL == this.state));
    };
    // Method
    p.prototype._tick = function() {
        _base.prototype._tick.call(this);
        if (createjs.Ticker.getPaused()){return;}
        this.tickImpl();
    };
    p.prototype.tickImpl = function() {
        if (this.isDead){
            return;
        }
        if (State.FINISH == this.state){
            this.procFinishing();
            return;
        }
        // normal update
        this.updateVector();
        this.updatePos();
        this.doAction();
        this.updateState();
        this.updateDraw();
     };
    p.prototype.procFinishing = function () {
        // rotate
        this.rotation = (this.rotation + this.vRotation*1.2) % 360;
        // scale
        this.scaleX *= 0.98;
        this.scaleY *= 0.98;
        // pos
        var tgt = {x:MyGlobal.stage.centerX, y:MyGlobal.stage.centerY};
        var adjustRad = MyUt.GetRad(this.x, this.y, tgt.x, tgt.y);
        var adjustCos = Math.cos(adjustRad);
        var adjustSin = Math.sin(adjustRad);
        
        var distance = MyUt.GetLen(tgt.x,tgt.y, this.x,this.y);
        
        this.x += adjustCos *(distance/30);
        this.y += adjustSin *(distance/30);
        
    };
    p.prototype.updateDraw = function(){
        switch (this.state){
            case State.IDLE:
                this.drawShapeIdle();
                break;
            case State.DAMAGE:
                this.drawShapeDamage();
                break;
            case State.HEAL:
                this.drawShapeHeal();
                break;
        }
    };
    p.prototype.setStateIdle = function(){
        this.state = State.IDLE;
        this.stateCount = 0;
        this.stateRemainCount =0;
    };
    p.prototype.setStateDamage = function(){
        this.state = State.DAMAGE;
        this.stateCount = 0;
        this.stateRemainCount = MyDef.fps/5;
    };
    p.prototype.setStateHeal = function(){
        this.state = State.HEAL;
        this.stateCount = 0;
        this.stateRemainCount = MyDef.fps/4;
    };
    p.prototype.setStateFinish = function(){
        this.state = State.FINISH;
        this.stateCount = 0;
        this.actionType = Action.IDLE;
        this.updateDraw();
    };
    p.prototype.updateState = function(){
        if (State.IDLE == this.state){
            return;
        }
        ++this.stateCount;
        --this.stateRemainCount;
        if (0 < this.stateRemainCount){
            return;
        }
        this.setStateIdle();
    };
    p.prototype.updateVector = function(){
        this.vX *= airRegist;
        this.vY *= airRegist;
        var limitedV = MyUt.LimitVector(this.vX, this.vY,8.0);
        this.vX = limitedV.vX;
        this.vY = limitedV.vY;
        //var v = MyUt.GetVector(this.vX,this.vY);
    };
    p.prototype.updatePos = function(){
        this.x += this.vX;
        this.y += this.vY;
    };
    p.prototype.doAction = function(){
        this.actionWait = Math.max(0, this.actionWait - 1);
        switch (this.actionType){
            case Action.IDLE:
                this.rotation = (this.rotation + this.vRotation) % 360;
                break;
            case Action.ACCELE:
                this.doAccele();
                break;
        }
    };
    p.prototype.idle = function () {
        this.actionType = Action.IDLE;
        this.updateDraw();
    };
    p.prototype.accele = function () {
        this.actionType = Action.ACCELE;
    };
    p.prototype.notifyCollision = function (collision) {
        switch(collision.type){
            case "reflect":
                createjs.Sound.play("collision", {volume:0.3});
                this._reflectCollision(collision);
                break;
            case "damage":
            case "heal":
                createjs.Sound.play("damage");
            //    this.setStateDamage();
                this._reflectCollision(collision);
              //  MyGlobal.stageManager.notifyCollision(collision);
                break;
//            case "heal":
//                createjs.Sound.play("gain");
 //               this.setStateHeal();
 //               MyGlobal.stageManager.notifyCollision(collision);
  //              break;
            case "healRing":
                createjs.Sound.play("gain");
                this.setStateHeal();
                MyGlobal.stageManager.notifyCollision(collision);
                break;
            case "serial":
                createjs.Sound.play("gain");
                this.setStateHeal();
                MyGlobal.stageManager.notifyCollision(collision);
                break;
            case "finish":
                createjs.Sound.play("gain");
                this.setStateFinish();

                break;
        }
        this.updateDraw();

    };
    var reflect_impl = function(t1, t2, adjust){
        // calc angle
        var adjustRad = MyUt.GetRad(t1.x, t1.y, t2.x, t2.y);
        var adjustCos = Math.cos(adjustRad);
        var adjustSin = Math.sin(adjustRad);
        // adjust pos

        if (true == adjust){
          var distance = MyUt.GetLen(t2.x,t2.y, t1.x,t1.y);
          var adjustLen  = (t1.rad + t2.rad) - distance;
          t1.x -= adjustLen * adjustCos *3;
          t1.y -= adjustLen * adjustSin *3;
        }

        // bound
        var ref_normalize = 2.0;
        var n={ vX:ref_normalize*adjustCos,
                vY:ref_normalize*adjustSin};
        var ref_vec = MyUt.GetRefVector(t1, n);
        t1.vX = ref_vec.vX + (t2.vX*0.5) + (t1.vX*0.5);
        t1.vY = ref_vec.vY + (t2.vY*0.5) + (t1.vY*0.5);
        t1.x += t1.vX*2;
        t1.y += t1.vY*2;
    };
    
    p.prototype._reflectCollision = function(tgt) {
      //  reflect_impl(this,tgt, true);
        if (true != tgt.collisioned){
          tgt.collisioned = true;
          reflect_impl(tgt, this, true);
        }
        else{
          tgt.collisioned = false;
        }
        
    /*
        // calc angle
        var adjustRad = MyUt.GetRad(this.x, this.y, tgt.x, tgt.y);
        var adjustCos = Math.cos(adjustRad);
        var adjustSin = Math.sin(adjustRad);
        // adjust pos

        var distance = MyUt.GetLen(tgt.x,tgt.y, this.x,this.y);
        var adjustLen  = (this.rad + tgt.rad) - distance;
        this.x -= adjustLen * adjustCos *3;
        this.y -= adjustLen * adjustSin *3;

        // bound
        var ref_normalize = 1;
        var n={ vX:ref_normalize*adjustCos,
                vY:ref_normalize*adjustSin};
        var ref_vec = MyUt.GetRefVector(this, n);
        this.vX = ref_vec.vX + (tgt.vX*0.5) + (this.vX*0.5);
        this.vY = ref_vec.vY + (tgt.vY*0.5) + (this.vY*0.5);
        */
        
    } 
    p.prototype.doAccele = function () {
        if (0 != this.actionWait) {
            return;
        }
        createjs.Sound.play("accele",{interrupt: createjs.Sound.INTERRUPT_EARLY, volume:0.3});
        
        this.actionWait = 6;
        var v = MyUt.DegToV(this.rotation);

        var smog = MyGlobal.stage.addChild(new MyDef.Smog());
        smog.x = this.x + this.pipe_len * v.x;
        smog.y = this.y + this.pipe_len * v.y;
        smog.vX = 0.8*v.x;
        smog.vY = 0.8*v.y;

        var acceleration = 1.5;
        this.vX += v.x * -acceleration;
        this.vY += v.y * -acceleration;
    };
    p.prototype.dead = function(){
        this.isDead = true;
        // bomb
        createjs.Sound.play("destruction");
        var bomb = MyGlobal.stage.addChild(new createjs.Shape());
        bomb.x = this.x;bomb.y = this.y;
        bomb.rad = this.rad*0.5;
        bomb.alpha = 0.5;
        bomb._tick = function(){
            bomb.alpha -= 0.04;
            bomb.rad += 10;
            bomb.graphics.clear();
            bomb.graphics.beginFill(MyDef.eaterColor).drawCircle(0,0,this.rad);
            if (0.01 > this.alpha) {
                MyGlobal.stage.removeChild(this);
            }
        };

        // clear
        this.graphics.clear();
    };


}());

