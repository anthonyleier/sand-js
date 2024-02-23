import RNG from "../RNG.js";

export default class Stone {
    constructor() {
        this.color = this.generateColor();
        this.fixed = true;
        this.density = 2800;
        this.flammable = false;
    }

    generateColor() {
        let hue = 0;
        let saturation = 0;
        let brightness = RNG.generateNumber(20, 30);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
