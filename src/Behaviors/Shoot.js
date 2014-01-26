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
     *        duration: Interger. The maximum bullet's lifetime before it get's removed.
     *                            (0) indicates infinite. Default is 0.
     *        origin: {x, y}. The x and y position from which to fire the bullet, relative
     *                        to an unrotated object object's x and y position.
     *        angleOffset: Number. The angle in degrees the bullet should travel away from the
     *                       origin. Default 90 (straight up).
     *        fireKey: Key. The keycode to be used for firing. Default is SPACE.
     *        TODO -> delay: Number. The delay in seconds between shots. Default is 0.
     *        useMouse: bool. If set to true, use a mouse click to fire. Default is false.
     *        fireContinuous: bool. If set, firing will be continuous while key/mouse
     *                              is pressed. Default is false.
     *        fireRate: Number. Number of bullets to fire per second. Used only if
     *                          fireContinuous is set to true. Default is 5.
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
        var _rate = 1/props.fireRate || 1/5; //seconds per bullet
        var _origin = props.origin || new cutie.Vector(0, 0);
        //_origin = Math.sqrt(_origin.x*_origin.x + _origin.y*_origin.y);
        _origin = new cutie.Vector(props.origin.x, props.origin.y);

        var _angOffset;
        if('angleOffset' in props)
            _angOffset = props.angleOffset;
        else
            _angOffset = 90;

        var _delay = ('delay' in props)? props.delay:0;

        var _speed;
        if('speed' in props)
            _speed = props.speed;
        else
            _speed = 300;

        var _max;
        if('max' in props)
            _max = props.max;
        else
            _max = 10;

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
                document.addEventListener('mousedown', mouseDown, false);
                document.addEventListener('mouseup', mouseUp, false);
            }
            else {
                document.addEventListener('keydown', keyPress, false);
                document.addEventListener('keyup', keyRelease, false);
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
                    while(_pressTime > 0) {
                        _pressTime -= _rate;
                        addBullet(obj);
                    }
                }
                else if(!_fired) {
                    _delayTimer = _delay;
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
            _pressTime = 0;
        }

        function mouseUp(e) {
            _firePressed = false;
            _fired = false;
        }

        function keyPress(e) {
            if(e.which == _key && !_firePressed) {
                _firePressed = true;
                _pressTime = 0;
            }
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
            if(_max !== 0 && _bullets.length >= _max) {
                removeBullet(_bullets[0]);
                _bullets.splice(0, 1);
            }

            var clone = _bullet.clone();
            clone.x = obj.x;
            clone.y = obj.y;
            clone.rotation = obj.rotation;
            clone.regX = clone.image.width/2;
            clone.regY = clone.image.height/2;
            var rotation = (clone.rotation - _angOffset)*Math.PI/180;

            var nb = {
                "obj": clone, 
                "pos": _origin.rotate(clone.rotation).add(new cutie.Vector(obj.x, obj.y)), 
                "dir": new cutie.Vector(_speed*Math.cos(rotation), _speed*Math.sin(rotation))
            };
            _bullets.push(nb);
            _scene.addChild(nb.obj);
        }

        function updateBullets(time) {
            for(var i = 0, len = _bullets.length; i < len; i++) {
                var b = _bullets[i];
                b.pos = b.pos.add(b.dir.scale(time));
                b.obj.x = b.pos.x;
                b.obj.y = b.pos.y;
            }
        }

        function removeBullet(bullet) {
            _scene.removeChild(bullet.obj);
        }

    };

    module.Shoot = Shoot;
})(this.cutie.Behavior);