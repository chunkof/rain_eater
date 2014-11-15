(function() {
    // Class Name
    var p;
    window.MyDef.Smog = p = function() {this.initialize();};
    // Parent
    p.prototype = new createjs.Shape();
    // Initialize
    p.prototype._parentInitialize  = p.prototype.initialize;
    p.prototype._parentTick  = p.prototype._tick;
    p.prototype.vX = 0;
    p.prototype.vY = 0;
    p.prototype.initialize = function() {
        this._parentInitialize();
        // add custom setup logic.
        this.graphics.beginFill(MyDef.eaterColor).drawCircle(0,0,5);
        this.alpha = 0.33;
    };
    // Method
    p.prototype._tick = function() {
        this._parentTick();
        if (createjs.Ticker.getPaused()){return;}
        this.tickImpl();
    };
    p.prototype.tickImpl = function() {
        this.x += this.vX;
        this.y += this.vY;
        this.alpha -= 0.002;
        if(this.alpha < 0.001)
        {
          MyGlobal.stage.removeChild(this);
        }
    };
}());
