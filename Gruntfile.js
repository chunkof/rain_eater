module.exports = function(grunt){

    var working_dir = "grunt_work/";
    var release_dir = "release/RainEater/";
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),


        clean: {
            release: {
                src: [working_dir,release_dir]
            }
        },
        concat: {
            script: {
                src:
                    [
                        // only release
                        'script/analysis.js',

                        // script start------------------------------
                        // common
                        'script/common/utility.js',
                        'script/common/_game_def.js',
                        'script/common/button.js',
                        'script/common/text_button.js',
                        'script/common/edged_text.js',
                        // data
                        'script/data/data.js',
                        // play
                        'script/play/ball.js',
                        'script/play/smog.js',
                        'script/play/stage_manager/stage_manager.js',
                        'script/play/stage_manager/pause_button.js',
                        'script/play/player_ball.js',
                        'script/play/border.js',
                        // shooter
                        'script/play/shooter/touch_shooter.js',
                        'script/play/shooter/circular_shooter.js',
                        'script/play/shooter/shooter.js',
                        // shooter::logic
                        'script/play/shooter/logic/_def.js',
                        'script/play/shooter/logic/aim_target.js',
                        'script/play/shooter/logic/shoot.js',
                        'script/play/shooter/logic/move.js',
                        'script/play/shooter/logic/constant_shoot.js',
                        'script/play/shooter/logic/aim_logic.js',
                        'script/play/play_main.js',
                        'script/select/stage_button.js',
                        'script/select/select_main.js',
                        'script/main.js'
                        // script end------------------------------
                    ],
                dest: 'grunt_work/script.js'
            }
        },
        uglify : {
            dist : {
                src : [
                    working_dir+"script.js"
                ],
                dest : working_dir+"script.js"
            }
        },
        copy : {
            html: {
                src: 'index.html',
                dest : release_dir
            },
            icon: {
                src: 'favicon.ico',
                dest : release_dir
            },
            script: {
                expand: true,
                cwd: working_dir,
                src: 'script.js',
                dest : release_dir,
                flatten: true
            },
            lib: {
                expand: true,
                cwd: 'lib/',
                src: '**',
                dest : release_dir+"lib/",
                flatten: false
            },
            sound : {
                expand: true,
                cwd: 'sound/',
                src: '**',
                dest : release_dir+"sound/",
            }
        },

		autoshot: {
		        default_options: {
		            options: {
		                // necessary config
		                path: release_dir,
						remote: {
						  files: ""
						},
		                local: {
		                    path: '',
		                    port: 9000,
		                    files: [{
		                        src: 'index.html',
		                        dest: 'index.png',
		                        delay: 3000
		                    }]
		                },
		                viewport: [
		                    '768x768'
		                ]
		            },
		        },
		    }


    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoshot');
    
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy', 'autoshot']);

};
