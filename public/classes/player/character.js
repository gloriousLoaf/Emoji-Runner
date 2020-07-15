/* Character defines state & ability methods for player */
let jumpCount = 0;
class Character {
    constructor() {
        /* size of underlying circle,
            see comment at bottom for more shapes */
        this.circ = 55;
        // x,y coordinates & velocity on y-axis
        this.x = this.circ + 20;
        this.y = height - 110; // slightly off bottom
        this.yVel = 0;
        // adjust gravity & jump(this.yVel) vals
        this.grav = 2.25;
    }

    // where the circle begins & its diameter
    show() {
        // circle(this.x, this.y, this.circ);
        // args: image(image var, top edge, left edge, width, height);
        image(charImg, this.x, this.y, this.circ, this.circ);
    }

    // jump!
    jump() {
        // if character is on ground, big jump & increment jumpCount
        if (this.y === height - 75) {
            this.yVel = -32;
            jumpCount++;
        }
        /* doublejump: if in the air & count is 1,
            little jump then reset count */
        else if (this.y < height - this.circ && this.y > 0 && jumpCount >= 1) {
            this.yVel = -20;
            jumpCount = 0;
        }
    }

    // how velocity, gravity interact with jump
    move() {
        this.y += this.yVel;
        this.yVel += this.grav;
        // constrain: don't fall off bottom of screen
        this.y = constrain(this.y, 20, height - 75);
    }

    // p5.collide2d - check for collision with enemy
    hits(enemy) {
        // if true, it will end game loop (temp solution) see app.js draw()
        return collideCircleCircle(this.x, this.y, this.circ, enemy.x, enemy.y, enemy.circ);
    }
};

// p5.js Shapes: https://p5js.org/reference/#group-Shape