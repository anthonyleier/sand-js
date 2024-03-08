import Fire from "./particles/Fire.js";
import Lava from "./particles/Lava.js";
import Water from "./particles/Water.js";
import Stone from "./particles/Stone.js";

export default class Matrix {
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
                grid[i][j] = null;
            }
        }
        return grid;
    }

    copy() {
        return this.grid.map((row) => row.slice());
    }

    checkNeedToInvert(current, other) {
        if (other === undefined) return false;
        if (other === null) return true;

        let otherIncorrectDensity = other.density < current.density;
        let otherCanMove = !other.fixed;

        return otherIncorrectDensity && otherCanMove;
    }

    verifyLinesBounds(i) {
        return i >= 0 && i + 1 < this.lines;
    }

    updateDensity(current, i, j) {
        if (!current.fixed) {
            const direction = Math.random() < 0.5 ? -1 : 1;

            const below = this.grid[i + 1][j];
            const belowA = this.grid[i + 1][j - direction];
            const belowB = this.grid[i + 1][j + direction];

            if (this.checkNeedToInvert(current, below)) {
                this.newGrid[i][j] = below;
                this.newGrid[i + 1][j] = current;
            } else if (this.checkNeedToInvert(current, belowA)) {
                this.newGrid[i][j] = belowA;
                this.newGrid[i + 1][j - direction] = current;
            } else if (this.checkNeedToInvert(current, belowB)) {
                this.newGrid[i][j] = belowB;
                this.newGrid[i + 1][j + direction] = current;
            }
        }
    }

    updateWater(current, i, j) {
        if (!current.fixed) {
            const direction = Math.random() < 0.5 ? -1 : 1;

            const below = this.grid[i + 1][j];
            const belowA = this.grid[i + 1][j - direction];
            const belowB = this.grid[i + 1][j + direction];
            const left = this.grid[i][j - 1];
            const right = this.grid[i][j + 1];

            if (this.checkNeedToInvert(current, below)) {
                this.newGrid[i][j] = below;
                this.newGrid[i + 1][j] = current;
            } else if (this.checkNeedToInvert(current, belowA)) {
                this.newGrid[i][j] = belowA;
                this.newGrid[i + 1][j - direction] = current;
            } else if (this.checkNeedToInvert(current, belowB)) {
                this.newGrid[i][j] = belowB;
                this.newGrid[i + 1][j + direction] = current;
            } else if (left === null && current.direction == "left") {
                this.newGrid[i][j] = left;
                this.newGrid[i][j - 1] = current;
            } else if (right === null && current.direction == "right") {
                this.newGrid[i][j] = right;
                this.newGrid[i][j + 1] = current;
            } else if (left !== null) {
                current.direction = "right";
            }
        }
    }

    updateFire(current, i, j) {
        if (current instanceof Fire) {
            current.updateColor();
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    const neighbor = this.grid[i + x][j + y];
                    if (neighbor !== undefined && neighbor !== null && neighbor.flammable) {
                        this.newGrid[i + x][j + y] = new Fire();
                    }
                }
            }
        }
    }

    updateLava(current, i, j) {
        if (current instanceof Lava) {
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    const neighbor = this.grid[i + x][j + y];
                    if (neighbor !== undefined && neighbor !== null) {
                        if (neighbor.meltable) this.newGrid[i + x][j + y] = null;
                        if (!neighbor.meltable && neighbor.flammable) this.newGrid[i + x][j + y] = new Fire();
                        if (neighbor instanceof Water) this.newGrid[i + x][j + y] = new Stone();
                    }
                }
            }
        }
    }

    updateTimeLeft(current, i, j) {
        current.timeLeft -= 1;
        if (current.timeLeft !== "infinity" && current.timeLeft <= 0) {
            this.newGrid[i][j] = null;
        }
    }

    exists(particle) {
        return particle !== undefined && particle !== null;
    }

    update() {
        this.newGrid = this.copy();

        for (let i = 0; i < this.lines; i++) {
            for (let j = 0; j < this.columns; j++) {
                const current = this.grid[i][j];
                if (this.exists(current)) {
                    this.updateTimeLeft(current, i, j);

                    if (this.verifyLinesBounds(i)) {
                        this.updateFire(current, i, j);
                        this.updateLava(current, i, j);

                        if (!(current instanceof Water)) this.updateDensity(current, i, j);
                        else this.updateWater(current, i, j);
                    }
                }
            }
        }
        this.grid = this.newGrid;
    }
}
