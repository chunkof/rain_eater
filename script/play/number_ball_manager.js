(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Object Name
    MyDef.NumberBallManager = p;
    // Initialize
    p.prototype.initialize = function(spec) {
      this._balls = [];
      this._totalPushed = 0;
    };
    // pushBack
    p.prototype.pushBack = function(spec) {
        ++this._totalPushed;
        var order = this._balls.length;
        
        spec.owner = this;
        spec.active = (0 == order) ? true : false;
        spec.alpha = 1 - 0.25*order;
        spec.rad   = 32;
        spec.label = this._totalPushed.toString();
        
        var ball = new MyDef.NumberBall(spec);
        this._balls.push(ball);
        MyGlobal.stage.addChild(ball);
    };
}());
