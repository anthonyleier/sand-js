import Sand from "./particles/Sand.js";
import Wood from "./particles/Wood.js";
import Water from "./particles/Water.js";
import Oil from "./particles/Oil.js";
import Fire from "./particles/Fire.js";
import Stone from "./particles/Stone.js";
import Lava from "./particles/Lava.js";

export default class Game {
    constructor(width, height, matrix, blockSize) {
        this.canvas = document.getElementById("GameCanvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.width = width;
        this.canvas.height = height;
        this.matrix = matrix;

        this.blockSize = blockSize;
        this.leftMousePressed = false;

        this.currentParticle = "sand";
    }

    loop() {
        this.brushParticles();
        this.matrix.update();
        this.drawMatrix();
        requestAnimationFrame(() => this.loop());
    }

    addListeners() {
        this.canvas.addEventListener("mousedown", (event) => {
            this.leftMousePressed = true;
            this.lastEvent = event;
        });

        this.canvas.addEventListener("mouseup", () => {
            this.leftMousePressed = false;
        });

        this.canvas.addEventListener("mousemove", (event) => {
            this.lastEvent = event;
        });

        document.addEventListener("keydown", (event) => {
            this.selectParticle(event.key);
        });
    }

    removeHighlights() {
        const table = document.getElementById("infoTable");
        const lines = table.getElementsByTagName("tr");

        for (var i = 0; i < lines.length; i++) {
            lines[i].classList.remove("highlight");
        }
    }

    addHightlight(id) {
        const line = document.getElementById(id);
        line.classList.add("highlight");
    }

    selectParticle(key) {
        switch (key) {
            case "1":
                this.currentParticle = "sand";
                this.removeHighlights();
                this.addHightlight("sand");
                break;
            case "2":
                this.currentParticle = "wood";
                this.removeHighlights();
                this.addHightlight("wood");
                break;
            case "3":
                this.currentParticle = "water";
                this.removeHighlights();
                this.addHightlight("water");
                break;
            case "4":
                this.currentParticle = "oil";
                this.removeHighlights();
                this.addHightlight("oil");
                break;
            case "5":
                this.currentParticle = "fire";
                this.removeHighlights();
                this.addHightlight("fire");
                break;
            case "6":
                this.currentParticle = "stone";
                this.removeHighlights();
                this.addHightlight("stone");
                break;
            case "7":
                this.currentParticle = "lava";
                this.removeHighlights();
                this.addHightlight("lava");
                break;
        }
        console.log(`${this.currentParticle} selected!`);
    }

    createParticle(type) {
        switch (type) {
            case "sand":
                return new Sand();
            case "wood":
                return new Wood();
            case "water":
                return new Water();
            case "oil":
                return new Oil();
            case "fire":
                return new Fire(10);
            case "stone":
                return new Stone();
            case "lava":
                return new Lava();
        }
    }

    verifyCoordinates(line, column) {
        const lineOk = 0 <= line && line < this.matrix.lines;
        const columnOk = 0 <= column && column < this.matrix.columns;
        return lineOk && columnOk;
    }

    brushParticles() {
        if (this.leftMousePressed) {
            let mouseX = Math.floor((this.lastEvent.clientX - this.canvas.getBoundingClientRect().left) / this.blockSize);
            let mouseY = Math.floor((this.lastEvent.clientY - this.canvas.getBoundingClientRect().top) / this.blockSize);

            let brush = 5;
            let limit = Math.floor(brush / 2);

            for (let i = -limit; i <= limit; i++) {
                for (let j = -limit; j <= limit; j++) {
                    const chance = this.currentParticle !== "wood" ? Math.random() : 0;
                    if (chance < 0.75) {
                        let line = mouseY + j;
                        let column = mouseX + i;
                        if (this.verifyCoordinates(line, column)) this.matrix.grid[line][column] = this.createParticle(this.currentParticle);
                    }
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
