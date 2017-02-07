'use strict';

module.exports = function( grunt ) {

  // tasks
  grunt.initConfig({

    // compile Sass
    sass: {                              
      dist: {                           
        options: {                       
          style: 'expanded'
        },
        files: {              
          'dist/needstyles.css': 'src/main.scss'
        }
      }
    },

    // autoprefix CSS
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'Android 3', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
      },
      no_dest: {
        src: ['dist/needstyles.css']
      }
    },

    // beautify CSS
    csscomb: {
      styles: {
        options: {
          config: 'csscomb.json'
        },
        files: {
          'dist/needstyles.css': 'dist/needstyles.css'
        }
      }
    },

    // minify CSS
    cssmin: {
      options: {
          keepSpecialComments: 0
      },
      styles: {
        files: {
          'dist/needstyles.min.css': 'dist/needstyles.css'
        }
      }
    },

    // watches files for changes
    watch: {
      css: {
        files: ['src/*.scss','src/modules/**/scss/*.scss'],
        tasks: ['sass', 'autoprefixer']
      }
    }

  });

  // Загрузка плагинов, установленных с помощью npm install
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-sass' );
  grunt.loadNpmTasks( 'grunt-csscomb' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-autoprefixer' );

  // some default tasks

  grunt.registerTask( 'default', [ 'sass', 'autoprefixer' ] );
  grunt.registerTask( 'publish', [ 'sass', 'autoprefixer', 'csscomb', 'cssmin' ] );
};