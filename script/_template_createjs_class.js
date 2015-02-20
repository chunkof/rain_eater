(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Object Name
    MyDef.Sample = p;
    // Parent
    var _base = createjs.Shape;
    p.prototype = new _base();
    // Initialize
    p.prototype.initialize = function(/*spec*/) {
        _base.prototype.initialize.call(this);

    };
    // Method
    p.prototype._tick = function() {
        if (createjs.Ticker.getPaused()){return;}
        _base.prototype._tick.call(this);

    };
}());
