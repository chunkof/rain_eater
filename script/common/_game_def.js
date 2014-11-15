window.MyDef = [];
(function () {
    MyDef.fps = 40;
    MyDef.bgColor = MyUt.rgb(38,38,38);
    MyDef.damageColor = "White";
    MyDef.healColor         = "DeepSkyBlue";
    MyDef.healColorShadow   = "#000671";
    MyDef.healColorLight    = "#AFDFFF";
    MyDef.eaterColor        = "#F692BF";
    MyDef.eaterColorShadow  = "#3F1115";
    MyDef.storageName       = "__rain_eater__";
    MyDef.getRank = function(score){
        if (250 < score){
            return "The Eater";
        }
        if (150 < score){
            return "Master";
        }
        if (100 < score){
            return "Great";
        }
        if ( 60< score){
            return "Good";
        }
        if ( 40 < score){
            return "Normal";
        }

        return "Ummm";
    }
}());