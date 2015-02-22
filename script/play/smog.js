(function() {
    // Class Name
    var p = function() {this.initialize();};
    MyDef.Smog = p 
    // Parent
    var _base = createjs.Shape;
    p.prototype = new _base();
    // Initialize
    p.prototype.initialize = function() {
        _base.prototype.constructor.call(this);
        // add custom setup logic.
        this.graphics.beginFill(MyDef.eaterColor).drawCircle(0,0,5);
        this.alpha = 0.4;
        this.vX = 0;
        this.vY = 0;
    };
    // Method
    p.prototype._tick = function() {
        if (createjs.Ticker.getPaused()){return;}
        _base.prototype._tick.call(this);
        this.tickImpl();
    };
    p.prototype.tickImpl = function() {
        // update position status
        this.x += this.vX;
        this.y += this.vY;
        this.vX *= 0.99;
        this.vY *= 0.99;
        
        // update draw status
        var rateX = Math.random()*1.1;
        var rateY = Math.random()*1.1;
        this.scaleX += 0.020*rateX;
        this.scaleY += 0.020*rateY;
        this.alpha  -= 0.003*(rateX+rateY)/2;
        if(this.alpha < 0.001)
        {
          MyGlobal.stage.removeChild(this);
        }
    };
}());
