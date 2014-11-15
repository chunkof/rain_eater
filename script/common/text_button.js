(function() {
    "use strict";
    // Class Name
    window.MyDef.TextButton = p = function(spec) {this.initialize(spec);};
    // Parent
    var p;
    p.prototype = new createjs.Container();
    p.prototype._parentInitialize = p.prototype.initialize; p.prototype._parentTick = p.prototype._tick;
    // Initialize
    p.prototype.initialize = function(spec) {
        this._parentInitialize();

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
