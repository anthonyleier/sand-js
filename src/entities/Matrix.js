import Sand from "./Sand.js";
import Water from "./Water.js";

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

    update() {
        let newGrid = this.copy();
        for (let i = 0; i < this.lines; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.grid[i][j] !== null && !this.grid[i][j].fixed) {
                    if (i + 1 < this.lines) {
                        let direction = 1;
                        if (Math.random() < 0.5) {
                            direction *= 1;
                        }

                        let current = this.grid[i][j];
                        let below = this.grid[i + 1][j];
                        let belowA = this.grid[i + 1][j - direction];
                        let belowB = this.grid[i + 1][j + direction];

                        if (below === null || (below != null && below.density < current.density)) {
                            newGrid[i][j] = below;
                            newGrid[i + 1][j] = current;
                        } else if (belowA === null || (belowA != null && belowA.density < current.density)) {
                            newGrid[i][j] = belowA;
                            newGrid[i + 1][j - 1] = current;
                        } else if (belowB === null || (belowB != null && belowB.density < current.density)) {
                            newGrid[i][j] = belowB;
                            newGrid[i + 1][j + 1] = current;
                        }
                    }
                }
            }
        }
        this.grid = newGrid;
    }
}
