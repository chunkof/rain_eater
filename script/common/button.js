(function() {
    "use strict";
    var p = function(spec) {this.initialize(spec);};
    // Class Name
    MyDef.Button = p;
    // Parent
    var _base = createjs.Shape;
    p.prototype = new _base();
    // Initialize
    p.prototype.initialize = function() {
       _base.prototype.constructor.call(this);
    };
    // Method
    p.prototype._tick = function() {
        if (createjs.Ticker.getPaused()){return;}
        _base.prototype._tick.call(this);
    };
    p.prototype.tickImpl = function() {
        // add custom update logic.
    };
    p.prototype.setCallBack = function(callBack){
        this.callBack = callBack;
        var target = this;
        this.addEventListener("click", function(ev){
            target.callBack(ev);
        });
    };
}());
