(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "nyc", "src": "assets/nyc.jpg"});
        loader.loadFile({"id": "nyc2", "src": "assets/nyc2.jpg"});
        loader.loadFile({"id": "nyc3", "src": "assets/nyc3.jpg"});
        loader.loadFile({"id": "nyc4", "src": "assets/nyc4.jpg"});
        loader.loadFile({"id": "nyc4", "src": "assets/nyc5.jpg"});
        loader.loadFile({"id": "nyc6", "src": "assets/nyc6.jpeg"});
        loader.loadFile({"id": "nyc7", "src": "assets/nyc7.jpeg"});
        loader.loadFile({"id": "spidey1", "src": "assets/spiderman1.jpg"});
        loader.loadFile({"id": "spidey2", "src": "assets/spiderman2.jpg"});
        loader.loadFile({"id": "spidey3", "src": "assets/spiderman3.jpg"});
        loader.loadFile({"id": "spidey4", "src": "assets/spiderman4.png"});
        this.setPreloader(new cutie.Preloader.ProgressBar());
    }

    scene.init = function(preloaded) {
        cutie.Log.d("title.init()");
        var bkg = new cutie.Bitmap(preloaded.getResult("nyc"));
        

        bkg.addEventListener("click", function() {
            cutie.setScene("game");
        });
        this.addChild(bkg);

    }

    cutie.registerScene(scene, "title");
})();