MyDef.touchShooter = [];
(function () {
MyDef.touchShooter.shot = function(e) {
    var x = e.stageX;
    var y = e.stageY;
    var ball = MyGlobal.stage.addChild(new MyDef.Ball());
    ball.x = x;
    ball.y = y;
    ball.vX = MyUt.RndRangeFloor(-1, 1)*2;
    ball.vY = MyUt.RndRangeFloor(-1, 1)*2;
};
}());