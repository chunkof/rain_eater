var MyDebug = [];
(function() {
    "use strict";

    var debugString = ""

    MyDebug.addStr = function (str)
    {
        debugString += str + "<br>";
    }
    MyDebug.clearStr = function ()
    {
        debugString = "";
    }
    MyDebug.dispStr = function ()
    {
        $("#debug").html(debugString);
    }

}());
