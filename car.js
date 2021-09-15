class Car {
    constructor(
        maxSpeed,
        reverseSpeed,
        weight,
        color,
        x,
        y,
        width,
        height,
        game
    ) {
        this.game = game;
        this.maxSpeed = maxSpeed;
        this.reverseSpeed = reverseSpeed;
        this.weight = weight;
        this.color = color;
        this.width = width;
        this.height = height;
        this.vector = { x: 0, y: 0 };
        this.speed = 0;
        this.x = x;
        this.y = y;
        this.rotate = 0;
        this.state = STATE;
        this.turn = NO_TURN;
    }
    update() {
        if (this.state == STATE) this.noState();
        else if (this.state == ABILITY_STATE) this.ability();
        else if (this.state == BRAKE_STATE) this.brake();
        if (this.turn == TURN_LEFT) this.turnLeft(-this.speed / 5);
        else if (this.turn == TURN_RIGHT) this.turnRight(this.speed / 5);
        else this.rotate = this.rotate;
        this.setVector();
        this.x = this.x - this.vector.x;
        this.y = this.y - this.vector.y;
    }
    draw() {
        const ctx = this.game.ctx;
        ctx.fillStyle = this.color;
        ctx.translate(
            this.x - this.game.screen.x + this.width / 2,
            this.y - this.game.screen.y + this.height / 2
        );
        ctx.rotate(-(this.rotate * Math.PI) / 180);
        ctx.translate(-(this.x - this.game.screen.x + this.width / 2), -(this.y - this.game.screen.y + this.height / 2));
        ctx.fillRect(-(this.game.screen.x - this.x), -(this.game.screen.y - this.y),
            this.width,
            this.height
        );
        ctx.translate(
            this.x - this.game.screen.x + this.width / 2,
            this.y - this.game.screen.y + this.height / 2
        );
        ctx.rotate((this.rotate * Math.PI) / 180);
        ctx.translate(-(this.x - this.game.screen.x + this.width / 2), -(this.y - this.game.screen.y + this.height / 2));
    }

    physicalCollision() {}
    getLeftTop() {
        const center = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
        const radius = Math.sqrt(
            Math.pow(this.x - center.x, 2) + Math.pow(this.y - center.y, 2)
        );
        const y = Math.cos((this.rotate * Math.PI) / 180) * radius;
        const x = Math.sin((this.rotate * Math.PI) / 180) * radius;
        return { x, y };
    }
    getRightTop() {
        const center = { x: this.x + this.width / 2, y: this.y + this.height / 2 };
        const radius = Math.sqrt(
            Math.pow(this.x - center.x, 2) + Math.pow(this.y - center.y, 2)
        );
        const y = Math.cos((this.rotate * Math.PI) / 180) * radius;
        const x = Math.sin((this.rotate * Math.PI) / 180) * radius;
        return { x, y };
    }

    setVector() {
        this.vector.x = Math.sin((this.rotate * Math.PI) / 180) * this.speed;
        this.vector.y = Math.cos((this.rotate * Math.PI) / 180) * this.speed;
    }
    ability() {
        if (this.speed == 0) {
            this.speed += 1;
            return;
        }
        if (this.speed >= this.maxSpeed) {
            return;
        }
        this.speed += (this.speed * 90) / 1000;
    }
    noState() {
        this.speed -= 0.1;
        if (this.speed <= 0) this.speed = 0;
    }
    brake() {
        if (this.speed > -this.reverseSpeed) this.speed -= 0.2;
    }
    turnLeft(rotate) {
        this.rotate -= rotate;
        if (this.rotate == 0) this.rotate = 360;
    }
    turnRight(rotate) {
        this.rotate -= rotate;
        if (this.rotate > 360) this.rotate = 0;
    }
    keyDownControll(event) {
        var keyCode = event.code;
        switch (keyCode) {
            case "KeyW": //d
                if (this.state != BRAKE_STATE) this.state = ABILITY_STATE;
                break;
            case "KeyS": //s
                if (this.state != ABILITY_STATE) this.state = BRAKE_STATE;
                break;
            case "KeyA": //a
                if (this.turn != TURN_RIGHT) this.turn = TURN_LEFT;
                break;
            case "KeyD": //w
                if (this.turn != TURN_LEFT) this.turn = TURN_RIGHT;
                break;
        }
    }
    keyUpControll(event) {
        var keyCode = event.code;
        switch (keyCode) {
            case "KeyW": //d
                if (this.state != BRAKE_STATE) this.state = STATE;
                break;
            case "KeyS": //s
                if (this.state != ABILITY_STATE) this.state = STATE;
                break;
            case "KeyA": //a
                if (this.turn != TURN_RIGHT) this.turn = NO_TURN;
                break;
            case "KeyD": //w
                if (this.turn != TURN_LEFT) this.turn = NO_TURN;
                break;
        }
    }
}