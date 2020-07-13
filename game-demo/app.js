/* No arrow functions, classes use (this) keyword */

// the player & enemies
let character;
let enemies = [];

// vars for character, enemy & background images
let charImg;
let enemyImg;
let backImg;
// adjust file name & path for images & uncomment
function preload() {
    // charImg = loadImage(`someEmoji.jpg`);
    // enemyImg = loadImage(`someEnemy.jpg`);
    // backImg = loadImage(`someBack.gif`);
};

// setup our game arena
function setup() {
    // adjust canvas size according to background gif
    createCanvas(900, 450);
    character = new Character();
};

function resetSketch() {
    /* blank for now, future home of more complex functions? like score saving,
        options to redirect to home etc. see playAgain() below */
}

// player controls
function keyPressed() {
    // spacebar or up arrow jump
    if (key === ` ` || keyCode === UP_ARROW) {
        character.jump()
    }
    // fire projectiles?? F key
    if (keyCode === 70) {
        character.shoot() // not real yet
    }
};

// draws the scene in a loop, p5 functionality
function draw() {
    // background() method is touchy, more research?
    background(`cyan`);
    // add character
    character.show();
    character.move();
    // fill array with some randomly generated enemies
    enemyCreator();
    // then send our array of badguys
    for (let i of enemies) {
        // random millisecond value between 2 & 3k
        let rando = Math.floor(Math.random() * (3000 - 2000 + 1) + 2000);
        setTimeout(i.show(), i.move(), rando);
        // if you hit any enemy, kill loop (and trigger whatever events)
        if (character.hits(i)) {
            noLoop();
            playAgain();
        }
    }
};

/* enemy logic: first, random chance at having enemy,
    adjust < num. (could this be improved?) */
function enemyCreator() {
    // random() is p5 method: add more EnemyGround than EnemyAir
    if (random(0, 1) < 0.008) {
        enemies.push(new EnemyGround());
    }
    if (random(0, 1) < 0.004) {
        enemies.push(new EnemyAir());
    }
};

// temporary death function, use something nice like a Bootstrap modal
function playAgain() {
    // modal: OK reloads, Cancel should eventually take user to homescreen
    if (confirm(`Would you like to play again?`)) {
        // resetSketch(); make if fancy? just reload for now
        location.reload();
    }
    else {
        console.log(`Game Over`);
    }
};