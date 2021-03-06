(function(){
    Game = {
        character: $("#character"),
        ground: $("#ground"),
        keyLeft: $("#scenery-key-left"),
        keyRight: $("#scenery-key-right"),
        started: false,
        walkingLeft: false,
        walkingRight: false,
        position: 0,
        ended: false,
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
        inRange: function(range, hide_others) {
            pos = Game.position;
            if(!range) range = 50;
            for(i = this.texts.length - 1; i>=0; i--){
                if(hide_others) this.texts[i].el.removeClass("show")
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
    var theEnd = function() {
        Game.character.attr("class", "character");
        $(".overlay").addClass("show");
        Game.ended = true;
    }
    var processFrame = function() {
        if(Game.ended) return;
        if(Game.walkingRight && Game.position < Game.maxPosition - 3) {
            Game.character.attr("class", "character walking-right");
            Game.position += 4;
            inRange = Game.texts.inRange(100, true);
            if(inRange) inRange.el.addClass("show");
            if(Game.position > 8600) theEnd();
        } else if(Game.walkingLeft && Game.position > 3) {
            Game.character.attr("class", "character walking-left");
            Game.position -= 4;
            inRange = Game.texts.inRange(100, true);
            if(inRange) inRange.el.addClass("show");
        } else {
            Game.character.attr("class", "character");
        }
        $("body").css("left", - Game.position);
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
                Game.keyLeft.attr("class", "pressed");
                break;
            case KEY_RIGHT:
                Game.walkingRight = true;
                Game.keyRight.attr("class", "pressed");
                break;
        }
    }
});

$(window).keyup(function(e){
    if(Game.started){
        switch(e.keyCode) {
            case KEY_LEFT:
                Game.walkingLeft = false;
                Game.keyLeft.attr("class", "");
                break;
            case KEY_RIGHT:
                Game.walkingRight = false;
                Game.keyRight.attr("class", "");
                break;
        }
    }
});

Game.keyLeft.mousedown(function(e) {
    if(Game.started){
        Game.walkingLeft = true;
        Game.keyLeft.attr("class", "pressed");
    }
});

Game.keyRight.mousedown(function(e) {
    if(Game.started){
        Game.walkingRight = true;
        Game.keyRight.attr("class", "pressed");
    }
});

Game.keyLeft.mouseup(function(e) {
    Game.walkingLeft = false;
    Game.keyLeft.attr("class", "");
});

Game.keyRight.mouseup(function(e) {
    Game.walkingRight = false;
    Game.keyRight.attr("class", "");
});

Game.start();
