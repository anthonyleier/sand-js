import RNG from "./RNG.js";

export default class Sand {
    constructor() {
        this.color = this.generateColor();
        this.fixed = false;
        this.density = 1602;
    }

    generateRNG(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateColor() {
        let hue = 45;
        let saturation = RNG.generateNumber(50, 70);
        let brightness = RNG.generateNumber(50, 60);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
