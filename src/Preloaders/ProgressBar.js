this.cutie = this.cutie || {};
this.cutie.Preloader = this.cutie.Preloader || {};

(function(module){
    var ProgressBar = function() {
      this.initialize();
    }

    ProgressBar.prototype = new createjs.Container();
    ProgressBar.prototype.Container_initialize = ProgressBar.prototype.initialize;
    ProgressBar.prototype.initialize = function() {
        // Call super constructor
        this.Container_initialize();

        // ==================================================
        // DEFINITIONS
        // ==================================================
        this.bkg = new createjs.Shape();
        this.bkg.graphics.beginFill("#000000").drawRect(0, 0, cutie.WIDTH, cutie.HEIGHT);
        this.addChild(this.bkg);

        this.text = new createjs.Text("Loading", "36px Arial", "#ffffff");
        this.addChild(this.text);

        this.loadBar = new createjs.Shape();
        this.loadBar.graphics.beginFill("#ffffff").drawRect(0 + cutie.WIDTH/4, 0 + cutie.HEIGHT/4, cutie.WIDTH * (3/4), cutie.HEIGHT * (3/4));
        this.addChild(this.loadBar);
    }


    ProgressBar.prototype.onPreloadProgress = function(e){
        console.log('e.progress:' + e.progress);
        this.removeChild(this.text);

        //this.text = new createjs.Text("Loading " + (e.progress * 100).toFixed(1), "36px Arial", "#ffffff");
        //this.addChild(this.text);
    }

    module.TextOnly = TextOnly;

})(this.cutie.Preloader);