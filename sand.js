function copiarMatriz(matriz) {
    return matriz.map((row) => row.slice());
}

function criarMatriz(altura, largura) {
    let matriz = [];
    for (let i = 0; i < altura; i++) {
        matriz[i] = [];
        for (let j = 0; j < largura; j++) {
            matriz[i][j] = 0;
        }
    }
    return matriz;
}

function updateMatriz(matriz) {
    let novaMatriz = copiarMatriz(matriz);
    for (i = 0; i < alturaMatriz; i++) {
        for (j = 0; j < larguraMatriz; j++) {
            if (matriz[i][j] > 0) {
                if (i + 1 < alturaMatriz) {
                    let embaixo = matriz[i + 1][j];
                    if (embaixo === 0) {
                        novaMatriz[i][j] = 0;
                        novaMatriz[i + 1][j] = matriz[i][j];
                    }
                }
            }
        }
    }
    return novaMatriz;
}

function drawMatriz(matriz) {
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < alturaMatriz; i++) {
        for (j = 0; j < larguraMatriz; j++) {
            if (matriz[i][j] > 0) {
                contexto.fillStyle = "#C2A653";
                contexto.fillRect(j * tamanho, i * tamanho, tamanho, tamanho);
            }
        }
    }
}

const larguraCanvas = 400;
const alturaCanvas = 400;
const tamanho = 10;

let canvas = document.getElementById("GameCanvas");
let contexto = canvas.getContext("2d");
canvas.width = larguraCanvas;
canvas.height = alturaCanvas;

const larguraMatriz = larguraCanvas / tamanho;
const alturaMatriz = alturaCanvas / tamanho;

let matriz = criarMatriz(alturaMatriz, larguraMatriz);

canvas.addEventListener("click", (evento) => {
    let x = Math.floor((evento.clientX - canvas.getBoundingClientRect().left) / tamanho);
    let y = Math.floor((evento.clientY - canvas.getBoundingClientRect().top) / tamanho);
    matriz[y][x] = 1;
});

function update() {
    matriz = updateMatriz(matriz);
}

function draw() {
    drawMatriz(matriz);
}

var FRAME = 1000 / 60;
var loop = function () {
    update();
    draw();
    setTimeout(loop, FRAME);
};
setTimeout(loop, FRAME);
