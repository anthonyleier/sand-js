import RNG from "./RNG.js";

export default class Water {
    constructor() {
        this.color = this.generateColor();
        this.fixed = false;
        this.density = 997;
    }

    generateColor() {
        let hue = 218;
        let saturation = RNG.generateNumber(90, 100);
        let brightness = RNG.generateNumber(40, 50);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
