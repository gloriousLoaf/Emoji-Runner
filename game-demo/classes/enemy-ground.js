/* Enemy defines state & ability methods for enemies,
    may need unique classes & files for different types */

class EnemyGround {
    constructor() {
        // size of underlying circle, adjust as needed
        this.circ = 75;
        this.x = width;
        this.y = height - 65; // so enemy isn't "floating"
    }

    // begins off right edge
    show() {
        // placeholder shape for enemy
        circle(this.x, this.y, this.circ);
        // change to below: image(image var, top edge, left edge, width, height)
        // image(enemyImg, this.x, this.y, this.circ, this.circ);
    }

    // adjust speed as needed
    move() {
        this.x -= 10;
    }
}

// p5.js Shapes: https://p5js.org/reference/#group-Shape