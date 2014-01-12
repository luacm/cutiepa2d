this.cutie = this.cutie || {};

(function(module) {

    var Log = {};

    // Debug constants
    Log.VERBOSE = 2;
    Log.DEBUG = 3;
    Log.INFO = 4;
    Log.WARN = 5;
    Log.ERROR = 6;

    // Debug level - determines what level of messages are printed
    Log.level = Log.DEBUG;

    Log.v = function(message) {
        log(message, Log.VERBOSE);
    }

    Log.d = function(message) {
        log(message, Log.DEBUG);
    }

    Log.i = function(message) {
        log(message, Log.INFO);
    }

    Log.w = function(message) {
        log(message, Log.WARN);
    }

    Log.e = function(message) {
        log(message, Log.ERRO);
    }

    function log(message, level) {
        if (level >= Log.level) {
            switch(level) {
                case Log.VERBOSE: 
                    console.log(message);
                    break;
                case Log.DEBUG:
                    console.debug(message);
                    break;
                case Log.INFO:
                    console.info(message);
                    break;
                case Log.WARN:
                    console.warn(message);
                    break;
                case Log.ERROR: 
                    console.error(message);
                default:
                    console.log(message);
            }
        }
    }

    module.Log = Log;
})(this.cutie);