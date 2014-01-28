/**
 * A collection of behaviors that add common actions to DisplayObjects. Each member
 * should override the methods described here to make a new Behavior class.
 * @namespace cutie.Behavior
 */

/**
 * The constructor. The only real work you can do here is initialize variables that 
 * don't require the object you're acting upon, perhaps initializing properties to 
 * default values. Most of you work will be done in init().
 * @memberof cutie.Behavior#
 * @function Behavior
 * @public
 * @param {Object} [props] The properties passed in to the Behavior.
 */

/**
 * Override this function to declare what happens when the behavior is added. Common
 * patterns include adding event listeners and initializing private fields.
 * @memberof cutie.Behavior#
 * @function init
 * @public
 * @param {createjs.DisplayObject} obj The object the behavior is acting upon.
 */

/**
 * Override this function to declare what happens on every frame update. This is where
 * the behavior should do actual work on the object.
 * @memberof cutie.Behavior#
 * @function tick
 * @public
 * @param {createjs.DisplayObject} obj The object the behavior is acting upon.
 * @param {createjs.Event} e The event for the tick.
 */