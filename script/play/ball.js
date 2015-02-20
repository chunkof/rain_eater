(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Class Name
    window.MyDef.Ball = p;
    // Parent
    var _base = createjs.Shape;
    p.prototype = new _base();
    // Initialize
    p.prototype.initialize = function(spec) {
        _base.prototype.initialize.call(this);
        // add custom setup logic.
        this.vX = 0;
        this.vY = 0;
        this.rad  = MyUt.GetValue(spec.rad);
        this.type = MyUt.GetValue(spec.type);
        if (spec.ringMargin)
        {
            this.ringMargin = spec.ringMargin;
        }
        else
        {
            this.ringMargin = 0;
        }
        // 色
        switch (this.type)
        {
        case "reflect":
            this.symbolColor = MyDef.objectColor;
            this.subColor    = MyDef.objectColorShadow;
            break;
        case "heal":
            this.symbolColor = MyDef.healColor;
            this.subColor    = MyDef.healColorShadow;
            break;
        case "damage":
        default:
            this.symbolColor = MyDef.damageColor;
            this.subColor    = MyDef.damageColorShadow
            break;;
        }

        // set area
        var margin = 60 + this.ringMargin;
        this.minX = 0-this.rad-margin;
        this.maxX = MyGlobal.stage.width+this.rad+margin;
        this.minY = 0-this.rad-margin;
        this.maxY = MyGlobal.stage.height+this.rad+margin;

        // draw
        this._draw();

        this._border_len_sq      = Math.pow(this.rad + MyGlobal.player.rad, 2);
        this._border_ring_len_sq = Math.pow(this.rad+this.ringMargin + MyGlobal.player.rad, 2);
    };
    // Method
    p.prototype._draw = function() {
        // clear
        this.graphics.clear()
        // body
        this.graphics
        .beginFill(this.symbolColor)
        .beginStroke(this.subColor).setStrokeStyle(2)
        .drawCircle(0,0,this.rad);
        var cache_width = this.rad + 2;
        // ring
        if (0<this.ringMargin)
        {
            this.graphics
            .endFill()
            .beginStroke(MyDef.healColor).setStrokeStyle(2)
            .drawCircle(0,0,this.rad+this.ringMargin);
            
            cache_width = cache_width + this.ringMargin + 4;
        }
        // cache
        this.cache(-cache_width, -cache_width, cache_width*2, cache_width*2)
    };
    p.prototype._tick = function() {
        if (createjs.Ticker.getPaused()){return;}
        _base.prototype._tick.call(this);
        // add custom update logic.
        if ((this.x < this.minX) || (this.x > this.maxX) ||
            (this.y < this.minY) || (this.y > this.maxY))
        {
            MyGlobal.stage.removeChild(this);

            return;
        }

        this.x += this.vX;
        this.y += this.vY;
        this.collision();
    };
    // collision
    p.prototype.collision = function(){
        var player = MyGlobal.player;
        if (!player.isHittable()){
            return;
        }
        var len_seq = MyUt.GetLenSq(this.x, this.y,player.x, player.y);
        if ((this.ringMargin > 0) &&
            (this._border_ring_len_sq > len_seq+0.1))
        {
            var org_type = this.type;
            this.type = "healRing";
            player.notifyCollision(this);
            this.type = org_type;
            this.ringMargin = 0;
            this._draw();
        }
        else if (this._border_len_sq > len_seq+0.1)
        {
            player.notifyCollision(this);
            if ("heal" == this.type){
                MyGlobal.stage.removeChild(this);
            }
        }
    };
}());
