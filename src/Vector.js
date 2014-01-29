this.cutie = this.cutie || {};

(function(module) {

    var Vector = function(x, y) {
        // ================================================
        // VARIABLE DECLARATIONS
        // ================================================
        this.x = x;
        this.y = y;

        // ================================================
        // PUBLIC METHODS
        // ================================================
        this.rotate = function(deg) {
            return new Vector(this.x*Math.cos(deg*Math.PI/180) - this.y*Math.sin(deg*Math.PI/180), this.x*Math.sin(deg*Math.PI/180) + this.y*Math.cos(deg*Math.PI/180));
        }

        this.angle = function() {
            return Math.atan2(this.y, this.x)*180/Math.PI;
        };

        this.angleRad = function() {
            return Math.atan2(this.y, this.x);
        }

        this.add = function(vector) {
            return new Vector(this.x + vector.x, this.y + vector.y);
        };

        this.sub = function(vector) {
            return new Vector(this.x-vector.x, this.y-vector.y);
        };

        this.addScalar = function(scale) {
            this.x += scale*Math.cos(this.angleRad());
            this.y += scale*Math.sin(this.angleRad());
        }

        this.scale = function(value) {
            return new Vector(this.x*value, this.y*value);
        }

        this.dot = function(vector) {
            return new Vector(this.x*vector.x, this.y*vector.y);
        };

        this.magnitude = function() {
            return Math.sqrt(this.x*this.x+this.y*this.y);
        };

		// ================================================
        // PRIVATE METHODS
        // ================================================

	};

	module.Vector = Vector;
})(this.cutie);