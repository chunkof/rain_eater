var MyUt=[];
(function () {
var math = Math;
/**
 * RGB
 */
MyUt.rgb = function(r,g,b)
{
    var col = "" +r +"," +g +"," + b;
    return "#" + col.match(/\d+/g).map(function(a){return ("0" + parseInt(a).toString(16)).slice(-2)}).join("");
};
/**
 * Angle
 */
MyUt.DegToRad = function(deg){
    return deg * (Math.PI / 180);
};
MyUt.DegToV = function(deg){
    var rad = MyUt.DegToRad(deg);
    return MyUt.RadToV(rad);
};
MyUt.RadToV = function(rad){
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    return {x:cos, y:sin};
};
MyUt.RadToDeg = function(rad){
    var deg = rad * 180 / Math.PI;
    return deg;
};
MyUt.GetRad = function(x1,y1, x2,y2){
    var rad = Math.atan2(y2-y1, x2-x1);
    return rad;
};
MyUt.GetNormalV = function(x1,y1, x2,y2){
    var rad = MyUt.GetRad(x1,y1, x2,y2);
    return {x:Math.cos(rad),
            y:Math.sin(rad)};
};
/**
 * Random
 */
MyUt.RndRangeFloor = function(min, max) {
    var value =  math.floor(MyUt.RndRangeNoFloor(min,max+1));
    return value;
};
MyUt.RndRangeNoFloor = function(min, max) {
    var rnd = math.random()*(max-min) + min;
    return rnd;
};


/**
 *  Length
 */
MyUt.GetLen = function(x1,y1, x2,y2){

    var len = math.sqrt(MyUt.GetLenSq(x1,y1, x2,y2));
    return len;
};
MyUt.GetLenSq = function(x1,y1, x2,y2){
    var len_sq = math.pow(x2 - x1 , 2 ) + math.pow(y2 - y1 , 2 );

    return len_sq;
};
/**
 *  Vector
 */
MyUt.GetVector = function (vX, vY) {
    return math.sqrt(vX * vX + vY * vY);
};
MyUt.LimitVector = function(vX, vY, limit){
    var v = MyUt.GetVector(vX,vY);
    var adjust = 1;
    if (limit < v){
        adjust = limit/v;}
    return { vX: vX*adjust,
             vY: vY*adjust}

};
MyUt.GetRefVector = function(v, n) {
    var dot = function(a, b) {
        return a.vX * b.vX + a.vY * b.vY;};
    var d = dot(v, n) * 2.0;
    return {
        vX: v.vX - d * n.vX,
        vY: v.vY - d * n.vY
    };
};

/**
 * define
 */
MyUt.IsUndefined = function(target){
    return (typeof target === "undefined");
};
MyUt.OR = function(spec, default_spec){
    if (typeof spec === "undefined") {
        return default_spec;
    }
    return spec;
};

/**
 * funcion
 */
MyUt.GetValue = function(object){
    if (true == _.isFunction(object)){
        return object();
    }
    return object;
}


}());