(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Object Name
    MyDef.logic.AimAngle = p;
    // Initialize
    p.prototype.initialize = function(spec) {
        //initalize
        this.deg     = spec.start;
        this.start   = spec.start;
        this.end     = spec.end;
        this.add_abs = Math.abs(spec.add_abs);
        this.add     = (spec.start<spec.end) ? this.add_abs : this.add_abs*-1;
        this.min     = (spec.start<spec.end) ? spec.start   : spec.end;
        this.max     = (spec.start<spec.end) ? spec.end     : spec.start;
    };
    // Method
    p.prototype.execute = function(owner) {
        var rad1  = MyUt.GetRad(owner.x, owner.y, MyGlobal.stage.centerX, MyGlobal.stage.centerY);
        var rad2  = MyUt.DegToRad(this.deg);
        var rad   = rad1 + rad2;
        var v     = MyUt.RadToV(rad);
        owner.aim_vX = v.x;
        owner.aim_vY = v.y;

        this.deg = (this.deg + this.add) % 360;
        if (this.deg >= this.max){
            this.deg = this.max;
            this.add = this.add_abs*-1;
        }else
        if(this.deg <= this.min){
            this.deg = this.min;
            this.add = this.add_abs;
        }
    };
}());
