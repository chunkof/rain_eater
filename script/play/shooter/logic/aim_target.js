(function() {
    "use strict";
    var p  = function(target) {this.initialize(target);};
    // Object Name
    MyDef.logic.AimTarget = p;
    // Initialize
    p.prototype.initialize = function(target) {
        //initalize
        this.target = target;
    };
    // Method
    p.prototype.execute = function(owner) {
        var tgt = this.target;
        var v = MyUt.GetNormalV(owner.x, owner.y, tgt.x, tgt.y);
        owner.aim_vX = v.x;
        owner.aim_vY = v.y;
    };
}());
