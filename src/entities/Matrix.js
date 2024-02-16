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
                        let direction = 1;
                        if (Math.random() < 0.5) {
                            direction *= 1;
                        }

                        let below = this.grid[i + 1][j];
                        let belowA = this.grid[i + 1][j - direction];
                        let belowB = this.grid[i + 1][j + direction];

                        if (below === 0) {
                            newGrid[i][j] = 0;
                            newGrid[i + 1][j] = this.grid[i][j];
                        } else if (belowA === 0) {
                            newGrid[i][j] = 0;
                            newGrid[i + 1][j - 1] = this.grid[i][j];
                        } else if (belowB === 0) {
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
