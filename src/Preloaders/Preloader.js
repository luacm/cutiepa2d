/**
 * A collection of preloaders that show progress while assets are loading.
 * @namespace cutie.Preloader
 */

/**
 * The constructor. The only real work you can do here is initialize variables that 
 * don't require the object you're acting upon, perhaps initializing properties to 
 * default values. Most of you work will be done in init().
 * @memberof cutie.Preloader#
 * @function Preloader
 * @public
 * @param {Object} [props] The properties passed in to the Preloader.
 */

/**
 * Override this function to declare what happens when the preloader is added. Common
 * patterns include adding event listeners and initializing private fields.
 * @memberof cutie.Preloader#
 * @function init
 * @public
 */

/**
 * Override this function to declare what happens whenever progress is updated. This is where
 * you'll want to update your visual to say what happens when you load more stuff.
 * @memberof cutie.Preloader#
 * @function onProgressUpdate
 * @public
 * @param {createjs.Event} e The event for the progress update. Contains information about 
 *                           how much loading has been completed.
 */