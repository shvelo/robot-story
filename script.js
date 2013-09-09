(function(){
    Game = {
        mainLoop: 0,
        character: $("#character"),
        ground: $("#ground"),
        started: false,
        walkingLeft: false,
        walkingRight: false,
        position: 0,
        maxPosition: $("body").width() - $("#intro").width()
    };
    var processFrame = function() {
        if(Game.walkingRight && Game.position < Game.maxPosition) {
            Game.character.attr("class", "character walking-right");
            $("body").scrollLeft(Game.position++);
        } else if(Game.walkingLeft && Game.position > 0) {
            Game.character.attr("class", "character walking-left");
            $("body").scrollLeft(Game.position--);
        } else {
            Game.character.attr("class", "character");
            $("body").scrollLeft(Game.position);
        }
    }
    Game.mainLoop = setInterval(processFrame,1);
    Game.start = function() {
        Game.started = true;
        $("#intro").hide();
        $(".character.test-l, .character.test-r").hide();
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
    }
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
    }
});