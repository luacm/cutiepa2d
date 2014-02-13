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
        this.loadBar.graphics.beginFill("#fafafa").drawRect(cutie.WIDTH/4,(cutie.HEIGHT * 9 / 20), cutie.WIDTH * (1/2), cutie.HEIGHT/20);
        this.addChild(this.loadBar);
        
    }


    ProgressBar.prototype.onPreloadProgress = function(e){
        console.log('e.progress:' + e.progress);
        this.removeChild(this.completeBar);

        this.completeBar = new createjs.Shape();
        this.completeBar.graphics.beginFill("#a1a1a1").drawRect(cutie.WIDTH/4,(cutie.HEIGHT * 9 / 20), cutie.WIDTH * (1/2) * e.progress, cutie.HEIGHT/20);
        this.addChild(this.completeBar);
    }

    module.ProgressBar = ProgressBar;

})(this.cutie.Preloader);