import Fire from "./particles/Fire.js";

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

    verifyParticleWithGravity(current) {
        return current !== null && !current.fixed;
    }

    verifyLinesBounds(i) {
        return i - 1 > 0 && i + 1 < this.lines;
    }

    updateLiquids(current, i, j) {
        if (this.verifyParticleWithGravity(current)) {
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

    updateFire(current, i, j) {
        if (current instanceof Fire) {
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

    updateTimeLeft(current) {
        current.timeLeft -= 1;
        if (current.timeLeft <= 0) {
            this.newGrid[i][j] = null;
        }
    }

    update() {
        this.newGrid = this.copy();

        for (let i = 0; i < this.lines; i++) {
            for (let j = 0; j < this.columns; j++) {
                const current = this.grid[i][j];
                if (current !== undefined && current !== null) {
                    this.updateTimeLeft(current);
                    if (this.verifyLinesBounds(i)) {
                        this.updateFire(current, i, j);
                        this.updateLiquids(current, i, j);
                    }
                }
            }
        }
        this.grid = this.newGrid;
    }
}
