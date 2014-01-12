window.onload = function() {
    // Set the log level
    cutie.Log.level = cutie.Log.DEBUG;

    var scene1 = new cutie.Scene(1);
    var scene2 = new cutie.Scene(2);

    cutie.start(scene1);
}