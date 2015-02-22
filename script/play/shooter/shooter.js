(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Object Name
    MyDef.Shooter = p;
    // Parent
    var _base = createjs.Shape;
    p.prototype = new _base();
    // Initialize
    p.prototype.initialize = function(spec) {
        _base.prototype.constructor.call(this);
        this.baseCircle = spec.circle;
        this.degree     = spec.degree;
        this.logics =[];
        this.aim_vX = 1.0;
        this.aim_vY = 1.0;
        this.graphics.beginFill("gray").drawCircle(0,0,12);
        this.updatePosByDeg(this.degree);
    };
    // Method
    p.prototype._tick = function() {
        if (createjs.Ticker.getPaused()){return;}
        // logic
        var owner = this;
        _.each(this.logics, function(logic){
            logic.execute(owner);
        });
        // update pos
        this.updatePosByDeg(this.degree);
    };
    p.prototype.updatePosByDeg = function(deg){
        var v  = MyUt.DegToV(deg);
        var r  = this.baseCircle.rad2;
        this.x = r*v.x + this.baseCircle.x;
        this.y = r*v.y + this.baseCircle.y;
    };
}());
