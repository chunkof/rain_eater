(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Class Name
    window.MyDef.SerialBall = p;
    // Parent
    var _base = createjs.Container;
    p.prototype = new _base();
    // Initialize
    p.prototype.initialize = function(spec) {
        _base.prototype.initialize.call(this);
        // basic
        this.rad    = spec.rad;
        this.x      = spec.x;
        this.y      = spec.y;
        this.alpha  = spec.alpha;
        this.type   = "serial";
        // event
        this.owner  = spec.owner;
        this.active = spec.active;
        // shape
        var shape = new createjs.Shape();
        shape.graphics.beginStroke(MyDef.healColor).setStrokeStyle(2).drawCircle(0,0,this.rad)
        this.addChild(shape);
        // label
        var label = new createjs.Text(spec.label, "32px Arial", MyDef.healColor);
        label.textAlign = "center";
        label.textBaseline = "middle";
        this.addChild(label);
        
        // pre calc
        this._border_len_sq      = Math.pow(this.rad + MyGlobal.player.rad, 2);
    };
    // Method
    p.prototype._tick = function() {
        if (createjs.Ticker.getPaused()){return;}
        _base.prototype._tick.call(this);
        // add custom update logic.
        this.collision();
    };
    // collision
    p.prototype.collision = function(){
        // Is Hittable ?
        if (false == this.active){
            return;
        }
        var player = MyGlobal.player;
        if (!player.isHittable()){
            return;
        }
        // Check Collision
        var len_seq = MyUt.GetLenSq(this.x, this.y,player.x, player.y);
        if (this._border_len_sq <= len_seq+0.1){
            return;
        }
        
        // Have a Collision
        player.notifyCollision(this);
        this.owner.notifyRetrieved(this);
    };
}());
