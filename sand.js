class Matrix {
    constructor(lines, columns, blockSize) {
        this.lines = lines;
        this.columns = columns;
        this.blockSize = blockSize;
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
                if (this.grid[i][j] > 0) {
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

    draw(canvas, context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.lines; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.grid[i][j] > 0) {
                    context.fillStyle = "#C2A653";
                    context.fillRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);
                }
            }
        }
    }
}

function generateSand(event, matrix) {
    let mouseX = Math.floor((event.clientX - canvas.getBoundingClientRect().left) / blockSize);
    let mouseY = Math.floor((event.clientY - canvas.getBoundingClientRect().top) / blockSize);

    let brush = 3;
    let limit = Math.floor(brush / 2);

    for (let i = -limit; i <= limit; i++) {
        for (let j = -limit; j <= limit; j++) {
            if (Math.random() < 0.75) {
                let line = mouseY + j;
                let column = mouseX + i;
                matrix.grid[line][column] = 1;
            }
        }
    }
}

function loop() {
    matrix.update();
    matrix.draw(canvas, context);
    setTimeout(loop, frame);
}

const canvasWidth = 500;
const canvasHeight = 500;
const blockSize = 5;

let canvas = document.getElementById("GameCanvas");
let context = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const lines = canvasHeight / blockSize;
const columns = canvasWidth / blockSize;

let matrix = new Matrix(lines, columns, blockSize);

let leftMousePressed = false;

var frame = 1000 / 60;

canvas.addEventListener("mousedown", (event) => {
    leftMousePressed = true;
    generateSand(event, matrix);
});

canvas.addEventListener("mouseup", () => {
    leftMousePressed = false;
});

canvas.addEventListener("mousemove", (event) => {
    if (leftMousePressed) {
        generateSand(event, matrix);
    }
});

setTimeout(loop, frame);
