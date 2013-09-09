(function(){
    Game = {
        mainLoop: 0,
        character: $("#character"),
        ground: $("#ground"),
        started: false,
        walkingLeft: false,
        walkingRight: false
    };
    var processFrame = function() {
        if(Game.walkingRight) {
            Game.character.attr("class", "character walking-right");
            Game.ground.attr("class", "ground animate-right");
        } else if(Game.walkingLeft) {
            Game.character.attr("class", "character walking-left");
            Game.ground.attr("class", "ground animate-left");
        } else {
            Game.character.attr("class", "character");
            Game.ground.addClass("paused");
        }
    }
    Game.start = function() {
        Game.started = true;
        $("#intro").hide();
        $(".character.test-l, .character.test-r").hide();

        Game.mainLoop = setInterval(processFrame,1);
    }
})();

$("#intro").click(function(){
    Game.start();
});

KEY_UP = 38;
KEY_DOWN = 40;
KEY_LEFT = 37;
KEY_RIGHT = 39;

$(window).keydown(function(e){
    if(Game.started){
        switch(e.keyCode) {
            case KEY_LEFT:
                Game.walkingLeft = true;
                break;
            case KEY_RIGHT:
                Game.walkingRight = true;
                break;
        }
    } else Game.start();
});

$(window).keyup(function(e){
    if(Game.started){
        switch(e.keyCode) {
            case KEY_LEFT:
                Game.walkingLeft = false;
                break;
            case KEY_RIGHT:
                Game.walkingRight = false;
                break;
        }
    } else Game.start();
});