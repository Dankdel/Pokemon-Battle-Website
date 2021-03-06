
var charmander = {
    name: "Charmander",
    //health: 100,
    lvl: 54,
    type: ["Fire"],
    base_hp: 145,
    hp: 145,
    attack: 103,
    defense: 94,
    speed: 116,
    special: 101,
    effect: null,
    moves: [{
        name: "Ember",
        type: ["Fire"],
        attDef: "Attack",
        power: 40,
        accuracy: 1,
        priority: 0,
        pp: 25
    },
    {
        name: "Slash",
        type: ["Normal"],
        attDef: "Attack",
        power: 70,
        accuracy: 1,
        priority: 0,
        pp: 20
    },
    {
        name: "Mega Punch",
        type: ["Normal"],
        attDef: "Attack",
        power: 80,
        accuracy: 0.85,
        priority: 0,
        pp: 20
    },
    {
        name: "Flamethrower",
        type: ["Fire"],
        attDef: "Attack",
        power: 95,
        accuracy: 1,
        priority: 0,
        pp: 15
    }]
};

var pikachu = {
    name: "Pikachu",
    //health: 100,
    lvl: 50,
    type: ["Electric"],
    base_hp: 141,
    hp: 141,
    attack: 106,
    defense: 81,
    speed: 141,
    special: 101,
    effect: null,
    moves: [{
        name: "ThunderShock",
        type: ["Electric"],
        attDef: "Attack",
        power: 60,
        accuracy: 1,
        priority: 0,
        pp: 30
    },
    {
        name: "Quick Attack",
        type: ["Normal"],
        attDef: "Attack",
        power: 65,
        accuracy: 1,
        priority: 1,
        pp: 30
    },
    {
        name: "Thunderbolt",
        type: ["Electric"],
        attDef: "Attack",
        power: 100,
        accuracy: 1,
        priority: 0,
        pp: 15
    },
    {
        name: "Psychic",
        type: ["Psychic"],
        attDef: "Attack",
        power: 120,
        accuracy: 0.7,
        priority: 0,
        pp: 10
    }]
};

var typeEffectiveness = {
    normal: [1, 1, 1, 1, 1, 0.5, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    fight: [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 1, 1, 1, 1, 0.5, 2, 1],
    flying: [1, 2, 1, 1, 1, 0.5, 2, 1, 1, 1, 2, 0.5, 1, 1, 1],
    poison: [1, 1, 1, 0.5, 0.5, 0.5, 2, 0.5, 1, 1, 2, 1, 1, 1, 1],
    ground: [1, 1, 0, 2, 1, 2, 0.5, 1, 2, 1, 0.5, 2, 1, 1, 1],
    rock: [1, 0.5, 2, 1, 0.5, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
    bug: [1, 0.5, 0.5, 2, 1, 1, 1, 0.5, 0.5, 1, 2, 1, 2, 1, 1],
    ghost: [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1],
    fire: [1, 1, 1, 1, 1, 0.5, 2, 1, 0.5, 0.5, 2, 1, 1, 2, 0.5],
    water: [1, 1, 1, 1, 2, 2, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5],
    grass: [1, 1, 0.5, 0.5, 2, 2, 0.5, 1, 0.5, 2, 0.5, 1, 1, 1, 0.5],
    electric: [1, 1, 2, 1, 0, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 0.5],
    psychic: [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1],
    ice: [1, 1, 2, 1, 2, 1, 1, 1, 1, 0.5, 2, 1, 1, 0.5, 2],
    dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]
};





var currentState;
var cpuPokemon;
var userPokemon;



var cpuTurn = {
    play: function() {
        var randomMove = Math.floor(Math.random() * 4);
        var currentCPUMove = cpuPokemon.moves[randomMove];
        cpuPokemon.moves[randomMove].pp--;

        var setUpCPUField = function() {
            $("#chat-text").text("What will " + cpuPokemon.name + " do?");
            setTimeout(prepareToAttack, 1000);
        };

        var prepareToAttack = function() {
            $("#cpuPoke-img").stop();
            $("#cpuPoke-img").animate({
                top: "-=25",
            }, 200, function() {
                $("#cpuPoke-img").animate({
                top: "+=25",
            }, 200)
            });

            getAccuracy();
        };

        var getAccuracy = function() {
            var setAccuracy = Math.random();

            if(setAccuracy <= currentCPUMove.accuracy) {
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!");
                getMoveType();
            }

            else {
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + ".\n" + cpuPokemon.name + "'s attack missed!");
                currentState = playerTurn;
                setTimeout(loop, 1500);
            }
        };


        var getMoveType = function () {
            showMoveAnimation();

            if(currentCPUMove.attDef == "Attack") {
                setTimeout(attackingMove, 1500);
            }

            else {
                setTimeout(defensiveMove, 1500);
            }
        };

        var showMoveAnimation = function() {
            $("#attack-img").addClass("cpu-attack-img");
            $("#attack-img").removeClass("hide");
            //$("#attack-img").
            //fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
            for(i = 0; i < 4; i++) {
                $("#attack-img").fadeIn(100).fadeOut(100);
            }
        };

        var attackingMove = function() {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack-img");

            var crit = 1;
            var mod;
            var critPerc = cpuPokemon.speed / 512;
            var rand = Math.random();
            var damage;
            var damageFormula = function() {
                if(rand <= critPerc) {
                    crit = 2;
                }

                var x = (2 * cpuPokemon.lvl + 10) / 250;
                var y = cpuPokemon.attack / userPokemon.defense;
                var z = currentCPUMove.power;
                mod = crit * (Math.random() * (1 - 0.85) + 0.85);

                damage = Math.floor(mod * ((x * y * z) + 2));
            };

            if(!cpuPokemon.effect) {
                damageFormula();
                userPokemon.hp -= damage;

                if(crit == 2) {
                    $("#chat-text").text("Critical hit!");
                    console.log("Crit!");
                }

                console.log(mod + " " + crit + " Pika gave: " + damage + " Charm hp: " + userPokemon.hp + ", pp: " + currentCPUMove.pp);
            }

            else {
                //userPokemon.health -= (currentCPUMove.power) - (currentCPUMove.power * cpuPokemon.effect);
                userPokemon.hp -= (currentCPUMove.power) * (1 - cpuPokemon.effect);
                cpuPokemon.effect = null;
            }

            if(userPokemon.hp < 0)
                userPokemon.hp = 0;

            $("#user-health-bar").css("width", userPokemon.hp/userPokemon.base_hp * 100 + "%");
            $("#user-hp").text(userPokemon.hp + " / " + userPokemon.base_hp);
            currentState = playerTurn;

            if(crit == 2) {
                setTimeout(loop, 1500);
            }

            else {
                loop();
            }
        };

        var defensiveMove = function() {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack-img");

            userPokemon.effect = currentCPUMove.power;
            currentState = playerTurn;
            loop();
        };

        setUpCPUField();
    }
};

var playerTurn = {
    play: function() {
        var currentUserMove;

        var setUpUserField = function() {
            var moveButtons = ["#move1-text", "#move2-text", "#move3-text", "#move4-text"];

            $("#user-buttons").removeClass("hide");
            $("#chat-text").text("What will " + userPokemon.name + " do?");

            for(var i = moveButtons.length - 1; i >= 0; i--) {
                $(moveButtons[i]).html(userPokemon.moves[i].name + "<br> (pp: " + userPokemon.moves[i].pp + ")");
            }
        };

        var prepareToAttack = function() {
            $("#user-buttons").addClass("hide");
            $("#userPoke-img").stop();

            $("#userPoke-img").animate({
                top: "-=25",
            }, 200, function() {
                $("#userPoke-img").animate({
                top: "+=25",
            }, 200)
            });

            getAccuracy();
        };

        var getAccuracy = function() {
            var setAccuracy = Math.random();

            if(setAccuracy <= currentUserMove.accuracy) {
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!");
                getMoveType();
            }

            else {
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + ".\n" + userPokemon.name + "'s attack missed!");
                currentState = cpuTurn;
                setTimeout(loop, 1500);
            }
        };

        var getMoveType = function () {
            showMoveAnimation();

            if(currentUserMove.attDef == "Attack") {
                setTimeout(attackingMove, 1500);
            }

            else {
                setTimeout(defensiveMove, 1500);
            }
        };

        var showMoveAnimation = function() {
            $("#attack-img").addClass("user-attack-img");
            $("#attack-img").removeClass("hide");
            //$("#attack-img").
            //fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
            for(i = 0; i < 4; i++) {
                $("#attack-img").fadeIn(100).fadeOut(100);
            }
        };

        var attackingMove = function() {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack-img");

            var crit = 1;
            var mod;
            var critPerc = userPokemon.speed / 512;
            var rand = Math.random();
            var damage;
            var damageFormula = function() {
                if(rand <= critPerc) {
                    crit = 2;
                }

                var x = (2 * userPokemon.lvl + 10) / 250;
                var y = userPokemon.attack / cpuPokemon.defense;
                var z = currentUserMove.power;
                mod = crit * (Math.random() * (1 - 0.85) + 0.85);

                damage = Math.floor(mod * ((x * y * z) + 2));
            };

            if(!userPokemon.effect) {
                damageFormula();
                cpuPokemon.hp -= damage;

                if(crit == 2) {
                    $("#chat-text").text("Critical hit!");
                    console.log("Crit!");
                }

                console.log(mod + " " + crit + " Charm gave: " + damage + " Pika hp: " + cpuPokemon.hp + ", pp: " + currentUserMove.pp);
            }

            else {
                //cpuPokemon.health -= (currentUserMove.power) - (currentUserMove.power * userPokemon.effect);
                cpuPokemon.hp -= (currentUserMove.power) * (1 - userPokemon.effect);
                userPokemon.effect = null;
            }

            if(cpuPokemon.hp < 0)
                cpuPokemon.hp = 0;

            $("#cpu-health-bar").css("width", cpuPokemon.hp/cpuPokemon.base_hp * 100 + "%");
            $("#cpu-hp").text(cpuPokemon.hp + " / " + cpuPokemon.base_hp);
            currentState = cpuTurn;

            if(crit == 2) {
                setTimeout(loop, 1500);
            }

            else {
                loop();
            }
        };

        var defensiveMove = function() {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack-img");

            cpuPokemon.effect = currentUserMove.power;
            currentState = cpuTurn;
            loop();
        };

        $("#move1-button, #move2-button, #move3-button, #move4-button").unbind().click(function() {
            var move = $(this).attr("value");
            currentUserMove = userPokemon.moves[move];
            userPokemon.moves[move].pp--;
            prepareToAttack();
        });

        setUpUserField();
    }
};

var loop = function() {
    if(cpuPokemon.hp <= 0) {
        //$("#game-over").removeClass("hide");
        //$("#game-over").text("Game Over!\n You win!");
        $("#chat-text").text("Foe " + cpuPokemon.name + " fainted!");
        //if enter is pressed
        //$("#chat-text").text("You win!");

        document.addEventListener('keydown', function(event) {
            if(event.keyCode == 13) {
                $("#chat-text").text("You win!");
            }
        });
    }

    else if(userPokemon.hp <= 0) {
        //$("#game-over").removeClass("hide");
        //$("#game-over").text("Game Over!\nCPU wins!");
        $("#chat-text").text(userPokemon.name + " fainted!");
    }

    else {
        currentState.play();
    }
}

// START
var init = function() {
    cpuPokemon = pikachu;
    $("#cpu-name").text(cpuPokemon.name);
    $("#cpu-lvl").text("Lv" + cpuPokemon.lvl);
    $("#cpu-hp").text(cpuPokemon.hp + " / " + cpuPokemon.hp);

    userPokemon = charmander;
    $("#user-name").text(userPokemon.name);
    $("#user-lvl").text("Lv" + userPokemon.lvl);
    $("#user-hp").text(userPokemon.hp + " / " + userPokemon.hp);

    
    
    var debug = true;
    if(debug)
    {
        console.log("DEBUGGING\n\n");
        console.log(typeEffectiveness.bug.length);
        console.log(typeEffectiveness.dragon.length);
        console.log(typeEffectiveness.electric.length);
        console.log(typeEffectiveness.fight.length);
        console.log(typeEffectiveness.fire.length);
        console.log(typeEffectiveness.flying.length);
        console.log(typeEffectiveness.ghost.length);
        console.log(typeEffectiveness.grass.length);
        console.log(typeEffectiveness.ground.length);
        console.log(typeEffectiveness.ice.length);
        console.log(typeEffectiveness.normal.length);
        console.log(typeEffectiveness.poison.length);
        console.log(typeEffectiveness.psychic.length);
        console.log(typeEffectiveness.rock.length);
        console.log(typeEffectiveness.water.length);
    }



    // FIX THIS TO LOOK AT SPEED STAT
    // If same, it's random
    // Quick Attack has priority 1
    // Counter has priority -1
    // Everything else is 0
    // If paralyzed, speed reduced by 25%
    if(userPokemon.speed > cpuPokemon.speed)
        currentState = playerTurn;

    else if(cpuPokemon.speed > userPokemon.speed)
        currentState = cpuTurn;

    else {
        var rand = Math.random();

        if(rand < 0.5)
            currentState = cpuTurn;
        else
            currentState = playerTurn;
    }

    loop();
};

init();
