import Sand from "./Sand.js";
import Wood from "./Wood.js";
import Water from "./Water.js";

export default class Game {
    constructor(width, height, matrix, blockSize, frame) {
        this.canvas = document.getElementById("GameCanvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.width = width;
        this.canvas.height = height;

        this.matrix = matrix;
        this.frame = frame;

        this.blockSize = blockSize;
        this.leftMousePressed = false;

        this.currentParticle = "sand";
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

        document.addEventListener("keydown", (event) => {
            if (event.code === "Space") {
                console.log(this.currentParticle);

                if (this.currentParticle === "sand") {
                    console.log("sand -> wood");
                    this.currentParticle = "water";
                } else if (this.currentParticle === "wood") {
                    console.log("wood -> sand");
                    this.currentParticle = "sand";
                }
            }
        });
    }

    createParticle(type) {
        console.log(`Criando ${type}`);
        switch (type) {
            case "sand":
                return new Sand();
            case "wood":
                return new Wood();
            case "water":
                return new Water();
        }
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
                    this.matrix.grid[line][column] = this.createParticle(this.currentParticle);
                }
            }
        }
    }

    drawMatrix() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.matrix.lines; i++) {
            for (let j = 0; j < this.matrix.columns; j++) {
                if (this.matrix.grid[i][j] !== null) {
                    this.context.fillStyle = this.matrix.grid[i][j].color;
                    this.context.fillRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);
                }
            }
        }
    }
}
