this.cutie = this.cutie || {};

/**
 * @module cutie
 */
(function(module){
    /**
     * A list of constants for declaring how you want to scale your game.
     * @class ScaleType
     * @static
     */
    var ScaleType = {
        /**
         * Do not scale.
         * @property NONE
         * @type Number
         * @final
         */
        "NONE": 0,

        /**
         * Make it take up the full screen, even if it ruins the aspect ratio.
         * @property STRETCH
         * @type Number
         * @final
         */
        "STRETCH": 1,

        /**
         * Make it take up the full screen, but preserve aspect ratio by using black bars.
         * @property LETTERBOX
         * @type Number
         * @final
         */
        "LETTERBOX": 2
    };

    module.ScaleType = ScaleType;

})(this.cutie);