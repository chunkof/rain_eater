(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Object Name
    MyDef.SerialBallManager = p;
    // Initialize
    p.prototype.initialize = function(spec) {
      this._balls = [];
      this._totalPushed = 0;
    };
    // pushBack
    p.prototype.pushBack = function(spec) {
        // Update management info
        ++this._totalPushed;
        var order = this._balls.length;
        
        // Append ball settings
        spec.active = this.isActive(order);
        spec.alpha  = this.getAlpha(order);
        spec.owner  = this;
        spec.rad    = 32;
        spec.label  = this._totalPushed.toString();
        
        // Push ball to list
        var ball = new MyDef.SerialBall(spec);
        this._balls.push(ball);
        MyGlobal.stage.addChild(ball);
    };
    p.prototype.notifyRetrieved = function(ball)
    {
        // remove notified ball
        this._balls = _.without(this._balls, ball);
        MyGlobal.stage.removeChild(ball);
        
        // update
        if (this._balls.length > 0){
            this.updateBallsActivate();
        }
        else{
            this.appearFinishToken();
        }
    };
    p.prototype.updateBallsActivate = function(){
        var self = this;
        _.map(this._balls, function(ball, order){
            ball.active = self.isActive(order);
            ball.alpha  = self.getAlpha(order);
        });
    };
    p.prototype.appearFinishToken = function(){
        var token = new MyDef.FinishToken({x:MyGlobal.stage.centerX, y:MyGlobal.stage.centerY})
        MyGlobal.stage.addChild(token);
    }
    p.prototype.isActive = function(order){
        return (0 == order) ? true : false;
    };
    p.prototype.getAlpha = function(order){
        return (0 == order) ? 0.9 : (1 - 0.25*order)*0.6;
    };
}());
