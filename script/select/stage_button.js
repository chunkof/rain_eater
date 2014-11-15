(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Object Name
    window.MyDef.StageButton = p;
    // Parent
    var _base = createjs.Container;
    p.prototype = new _base();
    // Initialize
    p.prototype.initialize = function(spec) {
        _base.prototype.initialize.call(this);
        this.stage_name = spec.text;
        var bg_color = MyUt.OR(spec.bg_color, "orange");
        var bg_rad   = 60;
        var text       = MyUt.OR(spec.text, "XXX");
        var text_size  = 36;
        var text_color = MyUt.OR(spec.text_color, "white");

        // button
        var bg = new createjs.Shape();
        bg.graphics.beginFill(bg_color)
                   .beginStroke(MyDef.healColorShadow).setStrokeStyle(4)
                   .drawCircle(0,0,bg_rad);
        this.addChild(bg);
        var label = new createjs.Text(text, "bold "+text_size+"px Arial", text_color);
        label.textAlign = "center";
        label.textBaseline = "middle";
        this.addChild(label);

        // score
        var best_score = MyDef.Data.getStageBestScore(this.stage_name);
        if (null !== best_score)
        {
            var score_label = new MyDef.edged_text("Best:"+best_score.toFixed(2), "bold 20px Arial", "white","black", 2, "center");
            score_label.textAlign = "center";
            score_label.textBaseline = "middle";
            score_label.y = bg_rad*1.1;
            this.addChild(score_label);

            var rank = MyDef.getRank(best_score);
            score_label = new MyDef.edged_text("("+rank+")", "bold "+16+"px Arial", "white","black", 2, "center");
            score_label.textAlign = "center";
            score_label.textBaseline = "middle";
            score_label.y = bg_rad*1.1+20;
            this.addChild(score_label);
        }
        // call back
        this.setCallBack(spec.call_back);

    };
    // Method
    p.prototype._tick = function() {
        if (createjs.Ticker.getPaused()){return;}
        _base.prototype._tick.call(this);
    };
    p.prototype.setCallBack = function(callBack){
        var call_back = callBack;
        var stage_name = this.stage_name;
        this.addEventListener("click", function(ev){
            call_back(stage_name);
        });
    };
}());
