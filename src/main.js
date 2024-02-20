import Game from "./entities/Game.js";
import Matrix from "./entities/Matrix.js";

function main() {
    const width = 500;
    const height = 500;
    const blockSize = 5;

    const lines = height / blockSize;
    const columns = width / blockSize;

    let matrix = new Matrix(lines, columns, blockSize);
    let game = new Game(width, height, matrix, blockSize);

    game.addListeners();
    game.loop();
}

main();
