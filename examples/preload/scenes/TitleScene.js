(function() {
    var scene = new cutie.Scene();

    scene.preload = function(loader) {
        loader.loadFile({"id": "nyc", "src": "assets/nyc.jpg"});
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