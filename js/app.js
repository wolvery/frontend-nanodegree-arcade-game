/* This array holds the relative URL to the image used
 * for the possible players
 */
var players = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];
// Game status
var Game = function() {
    this.level = 0;
    this.pause = true;
    this.playerSprite = '';
    this.selectorX = 0;
    this.selectorY = 4 * 83;
};
Game.prototype.selectorRender = function() {
    ctx.drawImage(Resources.get('images/Selector.png'), this.selectorX, this.selectorY);
};
Game.prototype.update = function() {
    this.level += 1;
    if (this.level > 0) {
        if (allEnemies.length < 6) {
            allEnemies.push(new Enemy());
        }
    }
    //change enviroment to this level
};
Game.prototype.selection = function(keyPressed) {
    switch (keyPressed) {
        case 'enter':
            //the sprite has been selected
            this.playerSprite = players[Math.floor(this.selectorX / 101)];
            player.sprite = this.playerSprite;
            this.update();
            break;
        case 'left':
            if (this.selectorX > 0) {
                this.selectorX = this.selectorX - 101;
            }
            break;
        case 'right':
            if (this.selectorX < 400) {
                this.selectorX = this.selectorX + 101;
            }
            break;
    }
};
var playing = new Game();
// all enemies and players are Elements
var Element = function(factorX, factorY, sprite) {
    this.incrementY = 86;
    this.incrementX = 101;
    this.x = Math.floor(factorX * this.incrementX);
    this.y = Math.floor(factorY * this.incrementY);
    this.sprite = sprite;
};
//Get all extreme points from some element in canvas
Element.prototype.getExtremePoints = function() {
    var pointX1 = Math.floor(this.x);
    var pointX2 = Math.floor(this.x + Resources.get(this.sprite).naturalWidth * 0.7);
    var pointY1 = Math.floor(this.y);
    var pointY2 = Math.floor(this.y + Resources.get(this.sprite).naturalHeight / 5);
    return {
        X1: pointX1,
        X2: pointX2,
        Y1: pointY1,
        Y2: pointY2
    };
};
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = Math.floor(Math.random() * playing.level) + 1;
    var factor = Math.floor(Math.random() * 3);
    Element.call(this, 0, factor + 0.5, 'images/enemy-bug.png');
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //this.sprite = ;
};

Enemy.prototype = Object.create(Element.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = dt * 100 * this.speed + this.x;

    if (Math.floor(this.x) > 500) {
        this.x = 0;
        var factor = Math.floor(Math.random() * 3);
        this.y = Math.floor((factor + 0.5) * this.incrementY);
    }
};

//Check if there is a collisionDetection happening here
// x1_____x2 - > y1
// x1_____x2 - > y2


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Player class!
var Player = function() {
    // Variables applied to each of our instances go here
    // The image/sprite for our player
    //this.sprite = 'images/char-boy.png';
    //initial position to this element
    Element.call(this, 2, 4.5, playing.playerSprite);
};

Player.prototype = Object.create(Element.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if (this.y < 0) {
        this.reset();
        playing.update();
    }
};

Player.prototype.reset = function() {
    this.x = this.incrementX * 2;
    this.y = 4.5 * this.incrementY;
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keyPressed) {

    switch (keyPressed) {
        case 'enter':
            playing.pause = !playing.pause;
            break;
        case 'left':
            if (this.x > 0) {
                this.x = this.x - this.incrementX;
            }
            break;
        case 'up':
            this.y = this.y - this.incrementY;
            break;
        case 'right':
            if (this.x < 404) {
                this.x = this.x + this.incrementX;
            }
            break;
        case 'down':
            if (this.y < 385) {
                this.y = this.y + this.incrementY;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [new Enemy()];
player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        13: 'enter',
        27: 'esc',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (playing.level === 0) {
        playing.selection(allowedKeys[e.keyCode]);
    } else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});