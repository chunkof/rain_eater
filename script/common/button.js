(function() {
    "use strict";
    // Class Name
    var p;
    window.MyDef.Button = p = function(spec) {this.initialize(spec);};
    // Parent
    p.prototype = new createjs.Shape();
    p.prototype._parentInitialize = p.prototype.initialize; p.prototype._parentTick = p.prototype._tick;
    // Initialize
    p.prototype.initialize = function() {
        this._parentInitialize();
    };
    // Method
    p.prototype._tick = function() {
        this._parentTick();
        if (createjs.Ticker.getPaused()){return;}
        this.tickImpl();
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
