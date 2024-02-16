class Matrix {
    constructor(lines, columns) {
        this.lines = lines;
        this.columns = columns;
        this.grid = this.create(lines, columns);
    }

    create() {
        let grid = [];
        for (let i = 0; i < this.lines; i++) {
            grid[i] = [];
            for (let j = 0; j < this.columns; j++) {
                grid[i][j] = 0;
            }
        }
        return grid;
    }

    copy() {
        return this.grid.map((row) => row.slice());
    }

    update() {
        let newGrid = this.copy();
        for (let i = 0; i < this.lines; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.grid[i][j] != 0) {
                    if (i + 1 < this.lines) {
                        let below = this.grid[i + 1][j];
                        let belowLeft = this.grid[i + 1][j - 1];
                        let belowRight = this.grid[i + 1][j + 1];
                        if (below === 0) {
                            newGrid[i][j] = 0;
                            newGrid[i + 1][j] = this.grid[i][j];
                        } else if (belowLeft === 0) {
                            newGrid[i][j] = 0;
                            newGrid[i + 1][j - 1] = this.grid[i][j];
                        } else if (belowRight === 0) {
                            newGrid[i][j] = 0;
                            newGrid[i + 1][j + 1] = this.grid[i][j];
                        }
                    }
                }
            }
        }
        this.grid = newGrid;
    }
}

class Game {
    constructor(width, height, matrix, blockSize, frame) {
        this.canvas = document.getElementById("GameCanvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.width = width;
        this.canvas.height = height;

        this.matrix = matrix;
        this.frame = frame;

        this.blockSize = blockSize;
        this.leftMousePressed = false;
        this.generateColor();
    }

    loop() {
        this.matrix.update();
        this.drawMatrix();
        requestAnimationFrame(() => this.loop());
    }

    addListeners() {
        this.canvas.addEventListener("mousedown", (event) => {
            this.leftMousePressed = true;
            this.generateSand(event);
        });

        this.canvas.addEventListener("mouseup", () => {
            this.leftMousePressed = false;
        });

        this.canvas.addEventListener("mousemove", (event) => {
            if (this.leftMousePressed) {
                this.generateSand(event);
            }
        });
    }

    generateRNG(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    generateColor() {
        let hue = 45;
        let saturation = this.generateRNG(50, 70);
        let brightness = this.generateRNG(50, 60);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }

    generateSand(event) {
        let mouseX = Math.floor((event.clientX - this.canvas.getBoundingClientRect().left) / this.blockSize);
        let mouseY = Math.floor((event.clientY - this.canvas.getBoundingClientRect().top) / this.blockSize);

        let brush = 3;
        let limit = Math.floor(brush / 2);

        for (let i = -limit; i <= limit; i++) {
            for (let j = -limit; j <= limit; j++) {
                if (Math.random() < 0.75) {
                    let line = mouseY + j;
                    let column = mouseX + i;
                    this.matrix.grid[line][column] = this.generateColor();
                }
            }
        }
    }

    drawMatrix() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.matrix.lines; i++) {
            for (let j = 0; j < this.matrix.columns; j++) {
                if (this.matrix.grid[i][j] != 0) {
                    this.context.fillStyle = this.matrix.grid[i][j];
                    this.context.fillRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);
                }
            }
        }
    }
}

function main() {
    const width = 500;
    const height = 500;
    const blockSize = 5;
    const frame = 1000 / 60;

    const lines = height / blockSize;
    const columns = width / blockSize;

    let matrix = new Matrix(lines, columns, blockSize);
    let game = new Game(width, height, matrix, blockSize, frame);
    game.addListeners();
    game.loop();
}

main();
