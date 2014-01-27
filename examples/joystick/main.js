// ======================================================
// INIT
// ======================================================
window.onload = function() {
    // Set the log level
    cutie.Log.level = cutie.Log.VERBOSE;

    // Kick-off the game
    cutie.start("title", {
        "debugFPS": {
            "visible": true,
        }
    });
}