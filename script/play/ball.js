(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Class Name
    window.MyDef.Ball = p;
    // Parent
    var _base = createjs.Shape;
    p.prototype = new _base();
    // public def
    MyDef.Ball.Type = {
        REFLECT: 0,
        DAMAGE : 1,
        HEAL   : 2};
    // Initialize
    p.prototype.initialize = function(spec) {
        _base.prototype.initialize.call(this);
        // add custom setup logic.
        this.vX = 0;
        this.vY = 0;
        this.rad  = spec.rad;
        this.type = spec.type;
        switch (this.type)
        {
        case MyDef.Ball.Type.REFLECT:
            this.symbolColor = MyDef.objectColor;
            this.subColor    = MyDef.objectColorShadow;
            break;
        case MyDef.Ball.Type.HEAL:
            this.symbolColor = MyDef.healColor;
            this.subColor    = MyDef.healColorShadow;
            break;
        case MyDef.Ball.Type.DAMAGE:
        default:
            this.symbolColor = MyDef.damageColor;
            this.subColor    = MyDef.damageColorShadow
            break;;
        }
        
        var margin = 60;
        this.minX = 0-this.rad-margin;
        this.maxX = MyGlobal.stage.width+this.rad+margin;
        this.minY = 0-this.rad-margin;
        this.maxY = MyGlobal.stage.height+this.rad+margin;
        this.graphics
            .beginFill(this.symbolColor)
            .beginStroke(this.subColor).setStrokeStyle(2)
            .drawCircle(0,0,this.rad);

        var cache_width = this.rad + 2;
        this.cache(-cache_width, -cache_width, cache_width*2, cache_width*2)

        this._border_len_sq = Math.pow(this.rad + MyGlobal.player.rad, 2);
    };
    // Method
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
        if (this._border_len_sq > len_seq+0.1)
        {
            player.notifyCollision(this);
            if (MyDef.Ball.Type.HEAL == this.type){
                MyGlobal.stage.removeChild(this);
            }
        }
    };
}());
