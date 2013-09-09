(function(){
    Game = {
        character: $("#character"),
        ground: $("#ground"),
        started: false,
        walkingLeft: false,
        walkingRight: false,
        position: 0,
        maxPosition: $("body").width() - $("#intro").width(),
        half: $("#scenery-intro").width() / 2
    };
    Game.texts = {
        texts: [],
        at: function(pos) {
            for(i = this.texts.length - 1; i>=0; i--){
                if(this.texts[i].pos == pos) return this.texts[i];
            }
        },
        inRange: function(range) {
            pos = Game.position;
            if(!range) range = 50;
            for(i = this.texts.length - 1; i>=0; i--){
                if(this.texts[i].pos >= pos - range && this.texts[i].pos <= pos + range) return this.texts[i];
            }
        },
        add: function(el, pos) {
            this.texts.push({
                el: el,
                pos: pos
            });
        }
    }
    var processFrame = function() {
        if(Game.walkingRight && Game.position < Game.maxPosition - 3) {
            Game.character.attr("class", "character walking-right");
            Game.position += 4;
            $("body").scrollLeft(Game.position);
            inRange = Game.texts.inRange();
            if(inRange) inRange.el.addClass("show");
        } else if(Game.walkingLeft && Game.position > 3) {
            Game.character.attr("class", "character walking-left");
            Game.position -= 4;
            $("body").scrollLeft(Game.position);
        } else {
            Game.character.attr("class", "character");
            $("body").scrollLeft(Game.position);
        }
        window.requestAnimationFrame(processFrame);
    }
    window.requestAnimationFrame(processFrame);
    Game.start = function() {
        $(".text").each(function(){
            var t_position = $(this).data('position');
            Game.texts.add($(this), t_position);
        });
        Game.started = true;
    }
})();

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

Game.start();