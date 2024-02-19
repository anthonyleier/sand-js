import RNG from "./RNG.js";

export default class Wood {
    constructor() {
        this.color = this.generateColor();
        this.fixed = true;
        this.density = 600;
    }

    generateRNG(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateColor() {
        let hue = 0;
        let saturation = RNG.generateNumber(20, 30);
        let brightness = RNG.generateNumber(10, 20);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
