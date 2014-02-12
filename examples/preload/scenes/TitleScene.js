(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "nyc", "src": "assets/nyc.jpg"});
        loader.loadFile({"id": "spidey1", "src": "assets/spiderman1.jpg"});
        loader.loadFile({"id": "spidey2", "src": "assets/spiderman2.jpg"});
        loader.loadFile({"id": "spidey3", "src": "assets/spiderman3.jpg"});
        loader.loadFile({"id": "nyc2", "src": "assets/nyc.jpg"});
        loader.loadFile({"id": "spidey12", "src": "assets/spiderman1.jpg"});
        loader.loadFile({"id": "spidey22", "src": "assets/spiderman2.jpg"});
        loader.loadFile({"id": "spidey32", "src": "assets/spiderman3.jpg"});
        this.setPreloader(new cutie.Preloader.TextOnly());
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