this.cutie = this.cutie || {};

/**
 * @module cutie
 */
(function(module) {

    // ======================================================
    // CONSTRUCTOR
    // ======================================================
    /**
     * A container that manages a scene in your game. Automatically
     * manages things like preloading and collision detection.
     * @class Scene
     * @constructor
     */
    var Scene = function() {
      this.initialize();
    }

    Scene.prototype._collisionGroups;
    Scene.prototype._collidables;

    Scene.prototype = new createjs.Container();
    Scene.prototype.Container_initialize = Scene.prototype.initialize;
    Scene.prototype.initialize = function() {
        // Call super constructor
        this.Container_initialize();

        this._collisionGroups = [];
        this._collidables = {};
        // ==================================================
        // DEFINITIONS
        // ==================================================
        this._preloader = {};
    }

    // ======================================================
    // PUBLIC FUNCTIONS
    // ======================================================
    /**
     * Override this method and load all of your assets you want preloaded for this scene.
     * @method preload
     * @public
     * @param  {createjs.Loader} loader The loader to load all of your assets into.
     */
    Scene.prototype.preload = function(loader) {
    }

    /**
     * Override this method and do anything you want when preload progress is updated.
     * @method onPreloadProgress
     * @public
     * @param  {createjs.Event} e The event.
     */
    Scene.prototype.onPreloadProgress = function(e) {
        // e.loaded e.total e.progress(0-1)
        if (this._preloader && this._preloader.onPreloadProgress) {
            this._preloader.onPreloadProgress(e);
        }
    }

    /**
     * Called when this scene (or list of scenes) is done preloading.
     * @method onPreloadComplete
     * @public
     * @param  {cutie.Scene[]} scenes A list of scenes that were in this preload queue.
     * @param  {createjs.Event} e The event info.
     */
    Scene.prototype.onPreloadComplete = function(scenes, loader, e) {
        cutie.Log.v("cutie.Scene.onPreloadComplete()");

        // Store this loader as the loader for all for all of the scenes in this preload batch
        for (var i = 0; i < scenes.length; i++)
            cutie.storeLoader(scenes[i].name, loader);

        // Kick-off the scene
        this._init(loader);
    }

    /**
     * Sets the preloader to the one specified.
     * @param {createjs.DisplayObject} preloader The preloader you'd like to use for this scene.
     */
    Scene.prototype.setPreloader = function(preloader) {
        this._preloader = preloader;
        this.addChild(preloader);
        console.log("SET PRELOADER");
    }

    /**
     * The private wrapper for the init function. Handles some preloader stuff.
     * @function init
     * @private
     * @param {createjs.DisplayObject} preloader The preloader you'd like to use for this scene.
     */
    Scene.prototype._init = function(loader) {
        if (this._preloader) {
            this.removeChild(this._preloader);
        }
        this.init(loader);
    }

    /**
     * Overwrite this function to declare what happens when the scene starts.
     * @method init
     * @public
     */
    Scene.prototype.init = function() {
    }

    /**
     * Overwrite this function to declare what happens upon updating the scene. In other
     * words, this method is called every 1/framerate seconds.
     * @method tick
     * @public
     * @param  {createjs.Event} e The event.
     */
    Scene.prototype.tick = function(e) {

    }

    /**
     * The 'super' method for the tick that is overwritten by the end user. Does
     * some housekeeping (like calling children's ticks) in addition to calling
     * the user-defined tick().
     * @method _tickInternal
     * @private
     * @param  {createjs.Event} e The event.
     */
    Scene.prototype._tickInternal = function(e) {
        this.tick(e);
        for(var i = 0; i < this.children.length; i++) {
            this.children[i]._tickInternal(e);
        }
        this._checkCollisions();
    }


    /** 
     * A method which is called on a collision between two objects.
     * @name CollisionHandler
     * @function
     * @param {Object} obj1 The first object involved in the collision.
     * @param {Object} obj2 The second object involved in the collision.
     * @param {Object} rect A rectangular area representing the intersection between the objects.
     *      
     */
    /**
     * Use this function to register a new Collision Group with the current scene.
     * @memberof cutie.Scene#
     * @function registerCollisionGroup
     * @public
     * @param  {String} name A unique name identifying a collision group for this scene.
     * @param  {Object} [props] The properties being passed in.
     * @param  {Object[]} [props.collidesWith] An object defining this collision group's interactions with other collision groups.
     * @param  {String[]} [props.collidesWith.name="*"] An array of the names of groups which interact with this collision group. "*" indicates all registered groups.
     * @param  {CollisionHandler} [props.collidesWith.handler] A collision handler to be called when an object of this group collides with an object in the group specified in the name array.
     */
    Scene.prototype.registerCollisionGroup = function(name, props) {
        if(name === "") cutie.Log.w("Adding collision group with no name.");

        var props = props || {};
        if((this._collisionGroups.filter(function(e){return e.name === name})).length === 0) {
            var nGroup = {
                "name": name,
                "collidesWith": []
            };
            if("internalCollisions" in props) nGroup.internalCollisions = props.internalCollisions;

            var _collidesWith = ("collidesWith" in props)?props.collidesWith:[];
            if(Object.prototype.toString.call(_collidesWith) !== "[object Array]") _collidesWith = [_collidesWith];
            
            _collidesWith.forEach(function(e) {
                //each element may have multiple names. Register one with each.
                if(!("name" in e)) cutie.Log.w("collidesWith object must specify a collision group name.");
                else if(!("handle" in e)) cutie.Log.w("collidesWith object must specify a collision handler.");
                else{

                    if(typeof e.name === 'string') e.name = [e.name];
                    nGroup.collidesWith.push({
                        "name": e.name,
                        "handle": e.handle
                    });
                }
            });

            this._collisionGroups.push(nGroup);
            if(!(nGroup.name in this._collidables)) this._collidables[nGroup.name] = [];
        }
        else cutie.Log.w("Collision group \"" + name + "\" already exists.");
        

    }


    /**
     * Use this function to add a DisplayObject to a collision group.
     * @memberof cutie.Scene#
     * @function addCollidable
     * @public
     * @param  {Object} obj The display object to be added to a Collision Group.
     * @param  {Object} props The properties being passed in.
     * @param  {String} props.groupName The name of the group to which the object will be added.
     * @param  {String} [props.collisionType] The type if collision detection to apply to object.
     */
    Scene.prototype.addCollidable = function(obj, props) {
        if(!props) cutie.Log.w("No property specified. Object not added to any group.");
        else if(!(props.groupName)) cutie.Log.w("No group name specified. Object not added to any group.");
        else if((this._collisionGroups.filter(function(e){return e.name === props.groupName})).length == 0) cutie.Log.w("Group " + props.groupName + " does not exist.");
        else{
            var collisionType = props.collisionType || "rectangle";

            var nCol = {
                "obj": obj,
                "collisionType": props.collisionType
            };

            this._collidables[props.groupName].push(nCol);
        }
    }

    /**
     * Use this function to remove a DisplayObject from a collision group.
     * @memberof cutie.Scene#
     * @function removeCollidable
     * @public
     * @param  {Object} obj The display object to be removed from the collision group.
     * @param  {String} [groupName="*"] The name of the group holding the object. Removes all references by default. 
     */
    Scene.prototype.removeCollidable = function(obj, groupName) {
        var groupName = groupName || "*";

        if(groupName === "*") {
            var len = this._collisionGroups.length;
            for(var i = 0; i < len; i++) {
                var group = this._collisionGroups[i].name;
                var collidables = this._collidables[group];
                var size = collidables.length;
                while(size > 0) {
                    if(collidables[--size].obj === obj) collidables.splice(size, 1);
                }
            }
        }
        else {
            var collidables = this._collidables[groupName];
            var size = collidables.length;
            while(size > 0) {
                if(collidables[--size].obj === obj) collidables.splice(size, 1);
            }
        }
    }

    // ======================================================
    // PRIVATE FUNCTIONS
    // ======================================================

    Scene.prototype._checkCollisions = function() {
        //start with all rectangular collisions
        var scene = this;
        if(this._collisionGroups) {
            var groups = this._collisionGroups.length;
            for(var i = 0; i < groups; i++) {
                //check group collisions
                var collidesWith = this._collisionGroups[i].collidesWith;
                var groupName = this._collisionGroups[i].name;
                var len = collidesWith.length;
                for(var j = 0; j < len; j++) {
                    this._collidables[groupName].forEach(function(e){
                        for(var k = 0, numNames = collidesWith[j].name.length; k < numNames; k++) {
                            if(collidesWith[j].name[k] !== groupName)
                                scene._checkGroupCollision(e, groupName, collidesWith[j].name[k], collidesWith[j].handle);
                            else
                                scene._checkIntraGroupCollision(e, groupName, collidesWith[j].handle);
                        }
                    });
                }
            }
        }
    }

    Scene.prototype._checkGroupCollision = function(collidable, collidableGroup, groupName, callback) {
        var obj = collidable.obj;
        var collisionType = collidable.collisionType;
        if(groupName === "*") { 
            for(var i = 0, len = this._collisionGroups.length; i < len; i++) {
                if(collidableGroup !== this._collisionGroups[i].name) this._checkGroupCollision(collidable, collidableGroup, this._collisionGroups[i].name, callback);
            }
        }
        else {
            var groupObjs = this._collidables[groupName];
            for(var i = 0, len = groupObjs.length; i < len; i++) {
                var checkCollidable = groupObjs[i];
                var check = checkCollidable.obj;
                if(check !== obj) {
                    var intersection;
                    if(collidable.collisionType === "rectangle" && checkCollidable.collisionType === "rectangle")
                        intersection = cutie.Collisions.checkRectCollision(obj, check);
                    else if(collidable.collisionType === "circle" && checkCollidable.collisionType === "circle")
                        intersection = cutie.Collisions.checkCircleCollision(obj, check);
                    else if(collidable.collisionType === "circle" && checkCollidable.collisionType === "rectangle")
                        intersection  = cutie.Collisions.checkCircleRectCollision(obj, check);
                    else if(collidable.collisionType === "rectangle" && checkCollidable.collisionType === "circle")
                        intersection = cutie.Collisions.checkCircleRectCollision(check, obj);
                    else
                        cutie.Log.w("No collision matching available for types " + collidable.collisionType + " and " + checkCollidable.collisionType)
                    if(intersection) {
                        callback(obj, check, intersection);
                    }
                }
            }
        }
    }

    Scene.prototype._checkIntraGroupCollision = function(collidable, collidableGroup, callback) {
        var obj = collidable.obj;
        var collisionType = collidable.collisionType;
        var mark = false;
        var groupObjs = this._collidables[collidableGroup];

        for(var i = 0, len = groupObjs.length; i < len; i++) {
            if(obj === groupObjs[i].obj) mark = true;
            else if(mark) {
                var intersection;
                if(collidable.collisionType === "rectangle" && groupObjs[i].collisionType === "rectangle")
                    intersection = cutie.Collisions.checkRectCollision(obj, groupObjs[i].obj);
                else if(collidable.collisionType === "circle" && groupObjs[i].collisionType === "circle")
                    intersection = cutie.Collisions.checkCircleCollision(obj, groupObjs[i].obj);
                else if(collidable.collisionType === "circle" && groupObjs[i].collisionType === "rectangle")
                    intersection  = cutie.Collisions.checkCircleRectCollision(obj, groupObjs[i].obj);
                else if(collidable.collisionType === "rectangle" && groupObjs[i].collisionType === "circle")
                    intersection = cutie.Collisions.checkCircleRectCollision(groupObjs[i].obj, obj);
                else
                    cutie.Log.w("No collision matching available for types " + collidable.collisionType + " and " + groupObjs[i].collisionType)
                if(intersection) {
                    callback(obj, groupObjs[i].obj, intersection);
                }
            }
        }
    }
    
     
    module.Scene = Scene;
})(this.cutie);
