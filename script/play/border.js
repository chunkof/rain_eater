(function() {
    "use strict";
    var p = function(spec) {this.initialize(spec);};
    // Class Name
    MyDef.Border = p;
    // Parent
    var _base = createjs.Shape;
    p.prototype = new _base();
    // define
    var ref_normalize = 1;
    // Initialize
    p.prototype.initialize = function(spec) {
        _base.prototype.constructor.call(this);
        this.x = spec.x;
        this.y = spec.y;
        this.rad  = spec.rad;
        this.rad2 = spec.rad2;
        var stroke_width = 3;
        //rad
        this.graphics.beginStroke(spec.color).setStrokeStyle(stroke_width).drawCircle(0, 0, this.rad);
        //rad2
        this.graphics.beginStroke(spec.color2).setStrokeStyle(stroke_width).drawCircle(0, 0, this.rad2);
        //cache
        var cache_rad = this.rad2 + stroke_width;
        this.cache(-cache_rad, -cache_rad, cache_rad*2, cache_rad*2)
    };
    // Method
    p.prototype._tick = function() {
        _base.prototype._tick.call(this);
        if (createjs.Ticker.getPaused()){return;}
        this.tickImpl();
    };
    p.prototype.tickImpl = function() {
        // check collision
        var player = MyGlobal.player;
        var distance = MyUt.GetLen(this.x,this.y, player.x,player.y);
        var border = this.rad - player.rad;
        if (border > distance) {
            return;
        }
        // calc angle
        var adjustRad = MyUt.GetRad(player.x, player.y, this.x, this.y);
        var adjustCos = Math.cos(adjustRad);
        var adjustSin = Math.sin(adjustRad);
        // adjust pos
        var adjustLen  = distance - border;
        player.x += adjustLen * adjustCos;
        player.y += adjustLen * adjustSin;

        // bound
        var n={ vX:ref_normalize*adjustCos,
                vY:ref_normalize*adjustSin};
        var ref_vec = MyUt.GetRefVector(player, n);
        player.vX = ref_vec.vX;
        player.vY = ref_vec.vY;
        
        createjs.Sound.play("collision", {volume:0.3});
    };
}());

