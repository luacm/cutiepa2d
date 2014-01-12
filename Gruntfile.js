module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    concat: {
      options: {
        separator: ";"
      },
      dist: {
        src: ["lib/createjs.min.js", "src/**/*.js"],
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
    watch: {
      files: ["src/**/*.js"],
      tasks: ["concat", "uglify"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.registerTask("default", ["concat"]);
}