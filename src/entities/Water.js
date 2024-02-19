import RNG from "./RNG.js";

export default class Sand {
    constructor() {
        this.color = this.generateColor();
    }

    generateColor() {
        let hue = 218;
        let saturation = RNG.generateNumber(90, 100);
        let brightness = RNG.generateNumber(40, 50);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
