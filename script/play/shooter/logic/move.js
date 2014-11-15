(function() {
    "use strict";
    var p  = function(spec) {this.initialize(spec);};
    // Object Name
    MyDef.logic.Move = p;
    // Initialize
    p.prototype.initialize = function(spec) {
        //initalize
        this.vDegree = spec;
    };
    // Method
    p.prototype.execute = function(owner) {
        owner.degree = (owner.degree+this.vDegree) % 360;
    };
}());
