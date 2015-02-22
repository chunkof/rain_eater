(function() {
    "use strict";
    // Class Name
    var p = function(spec) {this.initialize(spec);};
    // Parent
    var _base = createjs.Shape;
    createjs.extend(p, _base);
    // Initialize
    p.prototype.initialize = function(spec) {
        _base.prototype.constructor.call(this);
        var w = spec.w;
        var h = spec.h;
        var bg_color  = MyUt.OR(spec.bg_color,  "white");
        var txt_color = MyUt.OR(spec.txt_color, "black");

        this.bg = new createjs.Shape();
        this.bg.graphics.beginFill(bg_color)
            .beginStroke("black")
            .setStrokeStyle(3)
            .drawRoundRect(0, 0, w, h, 20);

        this.label = new createjs.Text(spec.text, "bold 40px Arial", txt_color);
        this.label.textAlign = "center";
        this.label.textBaseline = "middle";
        this.label.x = w/2;
        this.label.y = h/2;

        this.addChild(this.bg, this.label);
    };
    // Method
    p.prototype._tick = function() {
        if (createjs.Ticker.getPaused()){return;}
        _base.prototype._tick.call(this);
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
