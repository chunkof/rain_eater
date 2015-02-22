(function () {
    "use strict";
    var p = function(spec) {this.initialize(spec);};
    // Class Name
    MyDef.PauseButton = p;
    // Parent
    var _base = MyDef.Button;
    // Initialize
    p.prototype = new _base();
    p.prototype.initialize = function(/*spec*/) {
        _base.prototype.constructor.call(this);
        this.rad = 46;
        // add custom setup logic.
        var paused = createjs.Ticker.getPaused();
        this.old_paused = paused;
        this.drawBtn(paused);
        this.setCallBack(function(){
            var paused = createjs.Ticker.getPaused();
            createjs.Ticker.setPaused(!paused);
        });
    };
    // Method
    p.prototype._tick = function() {
        //if (createjs.Ticker.getPaused()){return;}
        _base.prototype._tick.call(this);
        // add custom update logic.
        var paused = createjs.Ticker.getPaused();
        if (this.old_paused == paused){
            return;
        }
        this.old_paused = paused;
        this.drawBtn(paused);
    };
    p.prototype.drawBtn = function(paused){
        if (paused){
            this.drawResumeBtn();
        }else{
            this.drawPauseBtn();
        }
    };
    p.prototype.drawPauseBtn = function(){
        this.uncache();
            var graphics = this.graphics;
            graphics.clear();
            graphics.beginFill(MyDef.bgColor).drawCircle(0,0,this.rad);
            graphics.beginStroke("gray").setStrokeStyle(6).drawCircle(0, 0, this.rad);
            var size     = 17;   // line size
            var slit_hlf = 20/2; // line slit size / 2
            graphics.beginStroke("white");
            graphics.moveTo(-slit_hlf, -size);
            graphics.lineTo(-slit_hlf, +size);
            graphics.moveTo(+slit_hlf, -size);
            graphics.lineTo(+slit_hlf, +size);
        var rad_m = this.rad+6;
        this.cache(-rad_m, -rad_m, rad_m*2, rad_m*2);
    };
    p.prototype.drawResumeBtn = function(){
        this.uncache();
            var graphics = this.graphics;
            graphics.clear();
            graphics.beginFill(MyDef.bgColor).drawCircle(0,0,this.rad);
            graphics.beginStroke("gray").setStrokeStyle(6).drawCircle(0, 0, this.rad);
            graphics.beginStroke("white").setStrokeStyle(5,"round","round");
            var top   = -17;
            var btm   = +17;
            var left  = -12;
            var right = +17;
            graphics.moveTo(left, top);graphics.lineTo(left, btm);
            graphics.moveTo(left, top);graphics.lineTo(right, 0);
            graphics.moveTo(left, btm);graphics.lineTo(right, 0);
        var rad_m = this.rad+6;
        this.cache(-rad_m, -rad_m, rad_m*2, rad_m*2);
    };
}());

