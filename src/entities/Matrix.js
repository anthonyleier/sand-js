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

    verifyBounds(i) {
        return i + 1 < this.lines;
    }

    update() {
        let newGrid = this.copy();

        for (let i = 0; i < this.lines; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.verifyBounds(i, j)) {
                    const current = this.grid[i][j];

                    if (this.verifyParticleWithGravity(current)) {
                        const direction = Math.random() < 0.5 ? -1 : 1;

                        const below = this.grid[i + 1][j];
                        const belowA = this.grid[i + 1][j - direction];
                        const belowB = this.grid[i + 1][j + direction];

                        if (this.checkNeedToInvert(current, below)) {
                            newGrid[i][j] = below;
                            newGrid[i + 1][j] = current;
                        } else if (this.checkNeedToInvert(current, belowA)) {
                            newGrid[i][j] = belowA;
                            newGrid[i + 1][j - direction] = current;
                        } else if (this.checkNeedToInvert(current, belowB)) {
                            newGrid[i][j] = belowB;
                            newGrid[i + 1][j + direction] = current;
                        }
                    }
                }
            }
        }
        this.grid = newGrid;
    }
}
