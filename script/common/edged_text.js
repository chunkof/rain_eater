(function() {
    "use strict";
    var p  = function(text, font, fill_color, stroke_color, stroke_size, align, base_line){
        this.initialize(text, font, fill_color, stroke_color, stroke_size,align, base_line);};
    // Object Name
    MyDef.edged_text = p;
    // Parent
    var _base = createjs.Container;
    p.prototype = new _base();
    // Initialize
    p.prototype.initialize = function(text, font, fill_color, stroke_color, stroke_size,align,base_line) {
        _base.prototype.constructor.call(this);

        stroke_color = MyUt.OR(stroke_color, "black");
        stroke_size  = MyUt.OR(stroke_size, 2);
        align        = MyUt.OR(align, "left");
        base_line    = MyUt.OR(base_line, "top");
        var tmp={};
        tmp = this.addChild(new createjs.Text(text,  font, stroke_color));
        tmp.x += stroke_size;tmp.textAlign = align;tmp.textBaseline = base_line;
        tmp = this.addChild(new createjs.Text(text,  font, stroke_color));
        tmp.x -= stroke_size;tmp.textAlign = align;tmp.textBaseline = base_line;
        tmp = this.addChild(new createjs.Text(text,  font, stroke_color));
        tmp.y += stroke_size;tmp.textAlign = align;tmp.textBaseline = base_line;
        tmp = this.addChild(new createjs.Text(text,  font, stroke_color));
        tmp.y -= stroke_size;tmp.textAlign = align;tmp.textBaseline = base_line;

        tmp = this.addChild(new createjs.Text(text,  font, fill_color));
        tmp.textAlign = align;tmp.textBaseline = base_line;
        //tmp.outline = stroke_size;
    };
    // Method
    p.prototype._tick = function() {
        if (createjs.Ticker.getPaused()){return;}
        _base.prototype._tick.call(this);

    };
}());
