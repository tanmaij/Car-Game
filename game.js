const map =
    "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 1 1 1 2 1 2 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 2 1 2 1 1 1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 2 1 2 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 2 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 2 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 2 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 2 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 2 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 2 2 2 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 1 2 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 1 2 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 1 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1";

class Game {
    constructor() {
        const array = map.split(" ");
        const matrix = [];
        for (let i = 0; i < 32; i++) {
            let arr = [];
            for (let j = 0; j < 20; j++) {
                arr.push(array[i * 20 + j]);
            }
            matrix.push(arr);
        }
        this.cars = [new Car(10, 4, 200, "red", 1100, 6500, 60, 130, this)];
        this.map = new Map(matrix, this);
        this.screen = {
            x: 0,
            y: 6400,
        };
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = SCREEN_WIDTH;
        this.canvas.height = SCREEN_HEIGHT;
        document.body.appendChild(this.canvas);
        setInterval(() => {
            this.loop();
        }, 20);
    }
    loop() {
        this.update();
        this.draw();
    }
    update() {
        this.screen.x = this.cars[0].x - SCREEN_WIDTH / 2 + 30;
        this.screen.y = this.cars[0].y - SCREEN_HEIGHT / 2 + 65;
        if (this.screen.x - SCREEN_WIDTH / 2 <= 0) this.screen.x = SCREEN_WIDTH / 2;
        else if (this.screen.x + SCREEN_WIDTH / 2 > this.map.width)
            this.screen.x = this.map.width - SCREEN_WIDTH + SCREEN_WIDTH / 2;
        if (this.screen.y - SCREEN_HEIGHT / 2 <= 0)
            this.screen.y = SCREEN_HEIGHT / 2;
        else if (this.screen.y + SCREEN_HEIGHT / 2 > this.map.height)
            this.screen.y = this.map.height - SCREEN_HEIGHT + SCREEN_HEIGHT / 2;
    }
    draw() {
        this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        this.map.draw();
        this.cars.forEach((car) => {
            car.update();
            car.draw();
        });
    }
}

var game = new Game();
window.addEventListener("keydown", (event) => {
    var keyCode = event.code;
    game.cars.forEach((car) => {
        car.keyDownControll(event);
    });
    // switch (keyCode) {
    //     case "KeyD": //d
    //         game.screen.x = game.screen.x + 5;
    //         break;
    //     case "KeyS": //s
    //         game.screen.y = game.screen.y + 5;
    //         break;
    //     case "KeyA": //a
    //         game.screen.x = game.screen.x - 5;
    //         break;
    //     case "KeyW": //w
    //         game.screen.y = game.screen.y - 5;
    //         break;
    // }
});
window.addEventListener("keyup", (event) => {
    game.cars.forEach((car) => {
        car.keyUpControll(event);
    });
});