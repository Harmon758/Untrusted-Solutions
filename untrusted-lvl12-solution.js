/*
 * robotNav.js
 *
 * The green key is located in a slightly more
 * complicated room. You'll need to get the robot
 * past these obstacles.
 */

function startLevel(map) {
    // Hint: you can press R or 5 to "rest" and not move the
    // player, while the robot moves around.

    map.placePlayer(0, map.getHeight() - 1);
    var player = map.getPlayer();

    map.defineObject('robot', {
        'type': 'dynamic',
        'symbol': 'R',
        'color': 'gray',
        'onCollision': function (player, me) {
            me.giveItemTo(player, 'greenKey');
        },
        'behavior': function (me) {
            if ((map.getObjectTypeAt(me.getX() + 4, me.getY()) == 'block'
            || map.getObjectTypeAt(me.getX() + 3, me.getY()) == 'block'
            || map.getObjectTypeAt(me.getX() + 2, me.getY()) == 'block'
            || map.getObjectTypeAt(me.getX() + 1, me.getY()) == 'block')
            && (map.getObjectTypeAt(me.getX(), me.getY() - 1) == 'block'
            || map.getObjectTypeAt(me.getX(), me.getY() - 2) == 'block'
            || map.getObjectTypeAt(me.getX(), me.getY() - 3) == 'block'
            || map.getObjectTypeAt(me.getX(), me.getY() - 4) == 'block')) {
                me.move('down');
            } else if (map.getObjectTypeAt(me.getX() + 1, me.getY()) == 'block'
            && map.getObjectTypeAt(me.getX(), me.getY() + 4) == 'block') {
                me.move('up');
            } else if (me.canMove('right')){
                me.move('right');
            } else if (me.canMove('down')) {
                me.move('down');
            }
        }
    });

    map.defineObject('barrier', {
        'symbol': '░',
        'color': 'purple',
        'impassable': true,
        'passableFor': ['robot']
    });

    map.placeObject(map.getWidth() - 1, map.getHeight() - 1, 'exit');
    map.placeObject(1, 1, 'robot');
    map.placeObject(map.getWidth() - 2, 8, 'greenKey');
    map.placeObject(map.getWidth() - 2, 9, 'barrier');

    for (var x = 0; x < map.getWidth(); x++) {
        map.placeObject(x, 0, 'block');
        if (x != map.getWidth() - 2) {
            map.placeObject(x, 9, 'block');
        }
    }

    for (var y = 1; y < 9; y++) {
        map.placeObject(0, y, 'block');
        map.placeObject(map.getWidth() - 1, y, 'block');
    }

    for (var i = 0; i < 4; i++) {
        map.placeObject(20 - i, i + 1, 'block');
        map.placeObject(35 - i, 8 - i, 'block');
    }
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateExactlyXManyObjects(1, 'robot');
    map.validateAtMostXObjects(1, 'greenKey');
}

function onExit(map) {
    if (!map.getPlayer().hasItem('greenKey')) {
        map.writeStatus("We need to get that key!");
        return false;
    } else {
        return true;
    }
}
     