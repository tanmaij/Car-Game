class Map {
    constructor(matrix, game) {
        this.game = game;
        this.matrix = matrix;
        this.width = this.matrix[0].length * 200;
        this.height = this.matrix.length * 200;
    }
    draw() {
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (
                    this.matrix[i][j] === "0" ||
                    this.matrix[i][j] === "2" ||
                    this.matrix[i][j] === "3"
                ) {
                    this.game.ctx.fillStyle = "#848484";
                } else if (this.matrix[i][j] === "1") {
                    this.game.ctx.fillStyle = "#7CFC00";
                }
                this.game.ctx.fillRect(-(this.game.screen.x - j * MAP_ITEM_SIZE - SCREEN_WIDTH / 2), -(this.game.screen.y - i * MAP_ITEM_SIZE - SCREEN_HEIGHT / 2),
                    MAP_ITEM_SIZE,
                    MAP_ITEM_SIZE
                );
                if (
                    this.matrix[i][j] === "0" ||
                    this.matrix[i][j] === "2" ||
                    this.matrix[i][j] === "3"
                ) {
                    this.game.ctx.fillStyle = "white";
                    this.game.ctx.fillRect(-(
                            this.game.screen.x -
                            j * MAP_ITEM_SIZE -
                            SCREEN_WIDTH / 2 -
                            100 +
                            10
                        ), -(this.game.screen.y - i * MAP_ITEM_SIZE - SCREEN_HEIGHT / 2 - 25),
                        20,
                        100
                    );
                }
            }
        }
    }
}