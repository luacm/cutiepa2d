this.cutie = this.cutie || {};

/** 
 * @module cutie
 */
(function(module) {

    /**
     * @class Log
     * @static
     */
    var Log = {};

    /**
     * @property VERBOSE
     * @type Number
     * @final
     * @public
     * @static
     */
    Log.VERBOSE = 2;

    /**
     * @property DEBUG
     * @type Number
     * @final
     * @public
     * @static
     */
    Log.DEBUG = 3;

    /**
     * @property INFO
     * @type Number
     * @final
     * @public
     * @static
     */
    Log.INFO = 4;

    /**
     * @property WARN
     * @type Number
     * @final
     * @public
     * @static
     */
    Log.WARN = 5;

    /**
     * @property ERROR
     * @type Number
     * @final
     * @public
     * @static
     */
    Log.ERROR = 6;

    var _level = Log.DEBUG;

    /**
     * Logs a message with level cutie.Log.VERBOSE.
     * @method v
     * @public
     * @static
     * @param  {String} message The message you want to log.
     */
    Log.v = function(message) {
        log(message, Log.VERBOSE);
    }

    /**
     * Logs a message with level cutie.Log.DEBUG.
     * @method d
     * @public
     * @static
     * @param  {String} message The message you want to log.
     */
    Log.d = function(message) {
        log(message, Log.DEBUG);
    }

    /**
     * Logs a message with level cutie.Log.INFO.
     * @method i
     * @public
     * @static
     * @param  {String} message The message you want to log.
     */
    Log.i = function(message) {
        log(message, Log.INFO);
    }

    /**
     * Logs a message with level cutie.Log.WARN.
     * @method w
     * @public
     * @static
     * @param  {String} message The message you want to log.
     */
    Log.w = function(message) {
        log(message, Log.WARN);
    }

    /**
     * Logs a message with level cutie.Log.ERROR.
     * @method e
     * @public
     * @static
     * @param  {String} message The message you want to log.
     */
    Log.e = function(message) {
        log(message, Log.ERROR);
    }

    /**
     * Sets the log level for the game. No log statements with a level
     * lower than the one specified will appear in the console.
     * @method setLogLevel
     * @public
     * @static
     * @param {Number} level The level you wish to set the logger to.
     */
    Log.setLogLevel = function(level) {
        _level = level;
    }

    function log(message, level) {
        if (level >= _level) {
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