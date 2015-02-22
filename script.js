(function() {
function importJS() {
    var scripts;
    scripts =
        [
        // script start------------------------------
        // common
        'script/common/debug.js',
        'script/common/utility.js',
        'script/common/_game_def.js',
        'script/common/button.js',
        'script/common/text_button.js',
        'script/common/edged_text.js',
        // data
        'script/data/data.js',
        // play
        'script/play/finish_token.js',
        'script/play/ball.js',
        'script/play/serial_ball.js',
        'script/play/serial_ball_manager.js',
        'script/play/smog.js',
        'script/play/stage_manager/stage_manager.js',
        'script/play/stage_manager/pause_button.js',
        'script/play/player_ball.js',
        'script/play/border.js',
        // shooter
        'script/play/shooter/touch_shooter.js',
        'script/play/shooter/shooter.js',
        // shooter::logic
        'script/play/shooter/logic/_def.js',
        'script/play/shooter/logic/aim_target.js',
        'script/play/shooter/logic/aim_angle.js',
        'script/play/shooter/logic/shoot.js',
        'script/play/shooter/logic/move.js',
        // play
        'script/play/play_main.js',
        // select
        'script/select/stage_button.js',
        'script/select/select_main.js',
        'script/main.js'
        // script end------------------------------
        ]
    ;
    for (var i=0; i<scripts.length; i++) {
        document.write('<script type="text/javascript" src="' +scripts[i] +'"><\/script>');
    }
}
importJS();
}());