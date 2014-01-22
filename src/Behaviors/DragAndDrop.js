//Drag and Drop behavior
this.cutie = this.cutie || {};

(function(module){


	var DragAndDrop = function(props) {
		this.props = props;
	};

	DragAndDrop.prototype = new module.Behavior();

	DragAndDrop.prototype.init = function(obj) {
		obj.addEventListener('mousedown', mousedown.bind(this, obj), false);
		obj.addEventListener('pressup', mouseup.bind(this, obj), false);
		obj.addEventListener('pressmove', pressmove.bind(this, obj), false);
	};

	DragAndDrop.prototype.clean = function(obj) {
	}

	DragAndDrop.prototype.tick = function(obj) {
		if(this.isClicked) {
			obj.x = this.lastX - this.offsetX;
			obj.y = this.lastY - this.offsetY;
		}
	};

	function mousedown(obj, e) {
		this.isClicked = true;
		this.offsetX = e.stageX-obj.x;
		this.offsetY = e.stageY-obj.y;
	}

	function mouseup(obj, e) {
		this.isClicked = false;
	}

	function pressmove(obj, e) {
		this.lastX = e.stageX;
		this.lastY = e.stageY;
	}

	module.DragAndDrop = DragAndDrop;
})(this.cutie);

/*
document.addEventListener('keyup', function(obj) {
				return function(e) {upLeftRight(e, obj); };
			} (this) , false);
*/