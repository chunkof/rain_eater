MyDef.Data = {};

(function () {
    //-----------------------
    // Internal
    //-----------------------
    // Read
    var _read = function(){
        if (!store.enabled){
            return null;
        }
        var data = store.get(MyDef.storageName);
        if (!data)
        {
            data = {
                version: "001",
                stage_info: {}
            };
        }
        return data;
    };
    // write
    var _write = function(data){
        if (!store.enabled){
            return;
        }
        store.set(MyDef.storageName, data);
    };
    var p    = MyDef.Data;
    var _data = _read();
    //-----------------------
    // Public
    //-----------------------
    p.enabled = function(){
        return store.enabled;
    };
    p.setStageBestScore = function(stage_name, score){
        if (!store.enabled){
            return;
        }
        if (true == MyUt.IsUndefined(_data.stage_info[stage_name]))
        {
            _data.stage_info[stage_name] = {};
        }

        _data.stage_info[stage_name].best_score = score;

        _write(_data);
    };
    p.getStageBestScore = function(stage_name){
        if (!store.enabled){
            return null;
        }
        if (true == MyUt.IsUndefined(_data.stage_info[stage_name]))
        {
            return 0;
        }
        if (!_data.stage_info[stage_name].best_score) {
            return 0;
        }

        return _data.stage_info[stage_name].best_score;
    }
}());