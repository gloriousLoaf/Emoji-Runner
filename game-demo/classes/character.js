/* Character defines state & ability methods for player */
let jumpCount = 0;
class Character {
    constructor() {
        /* size of underlying circle,
            see comment at bottom for more shapes */
        this.circ = 55;
        // x,y coordinates & velocity on y-axis
        this.x = this.circ + 20;
        this.y = height - this.circ;
        this.yVel = 0;
        // gravity: adjust this and jump(this.yVel) value
        this.grav = 2.6;
    }

    // where the circle begins & its diameter
    show() {
        circle(this.x, this.y, this.circ);
    }

    // jump!
    jump() {
        // if character is on ground, big jump & increment jumpCount
        if (this.y === height - this.circ) {
            this.yVel = -36;
            jumpCount++;
            console.log(jumpCount);
        }
        /* doublejump: if in the air & count is 1,
            little jump then reset count */
        else if (this.y < height - this.circ && this.y > 0 && jumpCount >= 1) {
            this.yVel = -20;
            jumpCount = 0;
            console.log(jumpCount);
        }
    }

    // how velocity, gravity interact with jump
    move() {
        this.y += this.yVel;
        this.yVel += this.grav;
        // constrain: don't fall off bottom of screen
        this.y = constrain(this.y, 0, height - this.circ)
    }

    // p5.collide2d - check for collision with enemy
    hits(enemy) {
        // if true, it will end game loop (temp solution) see app.js draw()
        return collideCircleCircle(this.x, this.y, this.circ, enemy.x, enemy.y, enemy.circ);
    }
};

// p5.js Shapes: https://p5js.org/reference/#group-Shape