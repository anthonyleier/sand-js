class Matriz {
    constructor(altura, largura) {
        this.altura = altura;
        this.largura = largura;
        this.grade = this.criarMatriz(this.altura, this.largura);
    }

    criarMatriz(altura, largura) {
        let matriz = [];
        for (let i = 0; i < altura; i++) {
            matriz[i] = [];
            for (let j = 0; j < largura; j++) {
                matriz[i][j] = 0;
            }
        }
        return matriz;
    }
}

function draw(canvas, matriz, tamanho) {
    let contexto = canvas.getContext("2d");
    for (i = 0; i < matriz.altura; i++) {
        for (j = 0; j < matriz.largura; j++) {
            if (matriz.grade[i][j] > 0) {
                contexto.fillStyle = "red";
                contexto.fillRect(i * tamanho, j * tamanho, tamanho, tamanho);
            } else {
                contexto.fillStyle = "yellow";
                contexto.fillRect(i * tamanho, j * tamanho, tamanho, tamanho);
            }
        }
    }
}

function main() {
    const larguraCanvas = 100;
    const alturaCanvas = 100;
    const tamanho = 10;

    let canvas = document.getElementById("GameCanvas");
    canvas.width = larguraCanvas;
    canvas.height = alturaCanvas;

    const larguraMatriz = 10;
    const alturaMatriz = 10;

    matriz = new Matriz(alturaMatriz, larguraMatriz);

    matriz.grade[1][1] = 1;
    console.table(matriz.grade);
    draw(canvas, matriz, tamanho);
}

main();
