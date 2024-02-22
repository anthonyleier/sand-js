import RNG from "../RNG.js";

export default class Oil {
    constructor() {
        this.color = this.generateColor();
        this.fixed = false;
        this.density = 700;
        this.flammable = true;
    }

    generateColor() {
        let hue = 0;
        let saturation = 100;
        let brightness = RNG.generateNumber(5, 15);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
