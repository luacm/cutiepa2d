this.cutie = this.cutie || {};

/**
 * A collection of behaviors that add common actions to DisplayObjects. Each member
 * should override the methods described here to make a new Behavior class.
 * @module cutie
 * @submodule Behavior
 */

(function(module) {
    /**
     * This is a template for a Behavior. A Behavior is a modular bit of code that invokes
     * a common pattern of actions on an object. Examples are giving an item eight-directional
     * movement, having an object follow another object, etc. Cutie already comes with a variety
     * of Behaviors, but if you'd like to build one yourself, simply override the methods described
     * here. *Note: This is just a template. You should never actually create an instance of this
     * class - it won't do anything.*
     * @class Behavior
     * @constructor
     * @public
     * @param {Object} [props] The properties passed in to the Behavior.
     */
    var Behavior = function(props) {

        /**
         * Override this function to declare what happens when the behavior is added. Common
         * patterns include adding event listeners and initializing private fields.
         * @method init
         * @public
         * @param {createjs.DisplayObject} obj The object the behavior is acting upon.
         */
        this.init = function(obj) {

        }   

        /**
         * Override this function to declare what happens when the behavior is removed. Common
         * patterns include removing event listeners or getting rid of DisplayObjects you added.
         * @method clean
         * @public
         * @param  {createjs.DisplayObject} obj The object the behavior is acting upon.
         */
        this.clean = function(obj) {

        }

        /**
         * Override this function to declare what happens on every frame update. This is where
         * the behavior should do actual work on the object.
         * @method tick
         * @public
         * @param {createjs.DisplayObject} obj The object the behavior is acting upon.
         * @param {createjs.Event} e The event for the tick.
         */
        this.tick = function(obj, e) {

        } 
    }
});





