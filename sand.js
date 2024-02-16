function copiarMatriz(matriz) {
    return matriz.map((row) => row.slice());
}

function criarMatriz(linhas, colunas) {
    let matriz = [];
    for (let i = 0; i < linhas; i++) {
        matriz[i] = [];
        for (let j = 0; j < colunas; j++) {
            matriz[i][j] = 0;
        }
    }
    return matriz;
}

function updateMatriz(matriz) {
    let novaMatriz = copiarMatriz(matriz);
    for (i = 0; i < linhasMatriz; i++) {
        for (j = 0; j < colunasMatriz; j++) {
            if (matriz[i][j] > 0) {
                if (i + 1 < linhasMatriz) {
                    let embaixo = matriz[i + 1][j];
                    let embaixoEsquerda = matriz[i + 1][j - 1];
                    let embaixoDireita = matriz[i + 1][j + 1];
                    if (embaixo === 0) {
                        novaMatriz[i][j] = 0;
                        novaMatriz[i + 1][j] = matriz[i][j];
                    } else if (embaixoEsquerda === 0) {
                        novaMatriz[i][j] = 0;
                        novaMatriz[i + 1][j - 1] = matriz[i][j];
                    } else if (embaixoDireita === 0) {
                        novaMatriz[i][j] = 0;
                        novaMatriz[i + 1][j + 1] = matriz[i][j];
                    }
                }
            }
        }
    }
    return novaMatriz;
}

function drawMatriz(matriz) {
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < linhasMatriz; i++) {
        for (j = 0; j < colunasMatriz; j++) {
            if (matriz[i][j] > 0) {
                contexto.fillStyle = "#C2A653";
                contexto.fillRect(j * tamanho, i * tamanho, tamanho, tamanho);
            }
        }
    }
}

function gerarAreia(evento) {
    let x = Math.floor((evento.clientX - canvas.getBoundingClientRect().left) / tamanho);
    let y = Math.floor((evento.clientY - canvas.getBoundingClientRect().top) / tamanho);
    matriz[y][x] = 1;
}

function loop() {
    matriz = updateMatriz(matriz);
    drawMatriz(matriz);
    setTimeout(loop, FRAME);
}

const larguraCanvas = 400;
const alturaCanvas = 500;
const tamanho = 10;

let canvas = document.getElementById("GameCanvas");
let contexto = canvas.getContext("2d");
canvas.width = larguraCanvas;
canvas.height = alturaCanvas;

const linhasMatriz = alturaCanvas / tamanho;
const colunasMatriz = larguraCanvas / tamanho;

let matriz = criarMatriz(linhasMatriz, colunasMatriz);
let mousePressionado = false;

var FRAME = 1000 / 60;

canvas.addEventListener("mousedown", (evento) => {
    mousePressionado = true;
    gerarAreia(evento);
});

canvas.addEventListener("mouseup", () => {
    mousePressionado = false;
});

canvas.addEventListener("mousemove", (evento) => {
    if (mousePressionado) {
        gerarAreia(evento);
    }
});

setTimeout(loop, FRAME);
