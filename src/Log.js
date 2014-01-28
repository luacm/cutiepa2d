this.cutie = this.cutie || {};

/** 
 * @namespace cutie.Log
 */
(function(module) {

    var Log = {};

    /**
     * @constant {Number} VERBOSE
     * @memberof cutie.Log
     * @public
     */
    Log.VERBOSE = 2;

    /**
     * @constant {Number} DEBUG
     * @memberof cutie.Log
     * @public
     */
    Log.DEBUG = 3;

    /**
     * @constant {Number} INFO
     * @memberof cutie.Log
     * @public
     */
    Log.INFO = 4;

    /**
     * @constant {Number} WARN
     * @memberof cutie.Log
     * @public
     */
    Log.WARN = 5;

    /**
     * @constant {Number} ERROR
     * @memberof cutie.Log
     * @public
     */
    Log.ERROR = 6;

    /**
     * Determines what level of messages are printed
     * @member {Number} level
     * @memberof cutie.Log
     * @static
     * @default cutie.Log.DEBUG
     */
    Log.level = Log.DEBUG;

    /**
     * Logs a message with level cutie.Log.VERBOSE.
     * @memberof cutie.Log
     * @function v
     * @public
     * @static
     * @param  {String} message The message you want to log.
     */
    Log.v = function(message) {
        log(message, Log.VERBOSE);
    }

    /**
     * Logs a message with level cutie.Log.DEBUG.
     * @memberof cutie.Log
     * @function d
     * @public
     * @static
     * @param  {String} message The message you want to log.
     */
    Log.d = function(message) {
        log(message, Log.DEBUG);
    }

    /**
     * Logs a message with level cutie.Log.INFO.
     * @memberof cutie.Log
     * @function i
     * @public
     * @static
     * @param  {String} message The message you want to log.
     */
    Log.i = function(message) {
        log(message, Log.INFO);
    }

    /**
     * Logs a message with level cutie.Log.WARN.
     * @memberof cutie.Log
     * @function w
     * @public
     * @static
     * @param  {String} message The message you want to log.
     */
    Log.w = function(message) {
        log(message, Log.WARN);
    }

    /**
     * Logs a message with level cutie.Log.ERROR.
     * @memberof cutie.Log
     * @function e
     * @public
     * @static
     * @param  {String} message The message you want to log.
     */
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