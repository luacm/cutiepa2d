this.cutie = this.cutie || {};
this.cutie.Behavior = this.cutie.Behavior || {};

(function(module){
    /**
     * This behavior allows an object
     * 
     * @param {Object} props
     *        bullet: DisplayObject. The object to render on a fire.
     *        speed: Number. The speed of fired bullets. Default is 300 px/s.
     *        max: Integer. The maximum number of bullets before they are recycled.
     *                      (0) indicates no recycling (bullets last forever). Default 100.
     *        origin: {x, y}. The x and y position from which to fire the bullet, relative
     *                        to an unrotated object object's x and y position.
     *        fireKey: Key. The keycode to be used for firing the 
     *        useMouse: bool. If set to true, use a mouse click to fire. Default is false.
     *        fireContinuous: bool. If set, firing will be continuous while key/mouse
     *                              is pressed. Default is false.
     *        fireRate: Number. Number of bullets to fire per second. Used only if
     *                          fireContinuous is set to true. Default is 10.
     *        
     *
     *
     */

    var Shoot = function(props) {
    	// ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        var props = props || {};
        var _bullet = props.bullet || new module.BitmapText('none');
        var _key = props.fireKey || cutie.KeyCodes.SPACE;
        var _rate = 1/props.fireRate || 1/10; //seconds per bullet
        var _max = props.max || 100;
        var _origin = props.origin || new cutie.Vector(0, 0);
        _origin = new cutie.Vector(_origin.x, _origin.y);

        var _speed;
        if('speed' in props)
        	_speed = props.speed;
        else
        	_speed = 300;

        if('max' in props)
        	_max = props.max;
        else
        	_max = 100;

        var _useMouse;
        if('useMouse' in props)
        	_useMouse = props.useMouse;
        else
        	_useMouse = false;

        var _cont;
        if('fireContinuous' in props)
        	_cont = props.fireContinuous;
        else
        	_cont = false;

        var _fired = false;
        var _pressTime = 0;
        var _firePressed = false;
        var _bullets = [];
        var _scene = cutie.getActiveScene(); //needed to add bullets, consider replacing with a factory

        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.init = function(obj) {
        	if(_useMouse) {
        		document.addEventListener('onmousedown', mouseDown, false);
        		document.addEventListener('onmouseup', mouseUp, false);
        	}
        	else {
        		document.addEventListener('onkeydown', keyPress, false);
        		document.addEventListener('onkeyup', keyPress, false);
        	}

        	obj.getBullets = getBullets;
        };

        this.clean = function(obj) {
        	obj.getBullets = null;
        };

        this.tick = function(obj, e) {
        	var time = e.delta/1000;

        	updateBullets(time);

        	if(_firePressed) {
        		if(_cont) {
        			_pressTime += time;
        			while(_pressTime > _rate) {
        				_pressTime -= _rate;
        				addBullet(obj);
        			}
        		}
        		else if(!_fired) {
        			_fired = true;
        			addBullet(obj);
        		}
        	}
        };

        // ================================================
        // PRIVATE METHODS
        // ================================================
        function mouseDown(e) {
        	_firePressed = true;
        	if(_cont) _pressTime = 0;
        }

        function mouseUp(e) {
        	_firePressed = false;
        	_fired = false;
        }

        function keyPress(e) {
        	if(e.which == _key) _firePressed = true;
        	if(_cont) _pressTime = 0;
        }

        function keyRelease(e) {
        	if(e.which == _key) {
        		_firePressed = false;
        		_fired = false;
        	}
        }

        function getBullets() {
        	return _bullets;
        }

        function addBullet(obj) {
        	if(_bullets.length >= _max) {
        		removeBullet(_bullets[0].obj);
        		_bullets.splice(0, 1);
        	}
        	var nb = {"obj": _bullet.clone(), "pos": _origin.add(new cutie.Vector(obj.x, obj.y))};
        	_bullets.push(nb);
        }

        function updateBullets(time) {
        	for(var i = 0, len = _bullets.length; i < len; i++) {
        		var b = _bullets[i];
        		var pos = b.pos;
        		pos.addScalar(_speed*time);
        		b.pos = pos;
        		b.x = pos.x;
        		b.y = pos.y;
        	}
        }

        function removeBullet(obj) {
        	_scene.removeChild(obj);
        }

    };

    module.Shoot = Shoot;
})(this.cutie.Behavior);