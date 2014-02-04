module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      options: {
        separator: ";"
      },
      dist: {
        // Note the cutie.js is put in front of the other src files because it
        // needs to be run before them. concat is smart enough to not double-include
        src: ["lib/createjs.min.js", "src/cutie.js", "src/**/*.js"],
        dest: "build/cutiepa2d.js"
      }
    },
    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
        sourceMap: "build/cutiepa2d.map.js"
      },
      dist: {
        src: "build/cutiepa2d.js",
        dest: "build/cutiepa2d.js"
      }
    },
    jsdoc : {
        dist : {
            src: ["src/*.js", "src/Behaviors/*.js", "src/Preloaders/*.js"], 
            options: {
                destination: "doc"
            }
        }
    },
    watch: {
      default: {
        files: ["src/**/*.js"],
        tasks: ["concat"]  
      },
      production: {
        files: ["src/**/*.js"],
        tasks: ["concat", "uglify"]  
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-jsdoc");

  grunt.registerTask("default", ["concat"]);
  grunt.registerTask("production", ["concat", "uglify", "jsdoc"]);
}