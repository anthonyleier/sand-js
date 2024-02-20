import RNG from "../RNG.js";

export default class Wood {
    constructor() {
        this.color = this.generateColor();
        this.fixed = true;
        this.density = 600;
        this.flammable = false;
    }

    setCoordinates(i, j) {
        this.i = i;
        this.j = j;
    }

    generateColor() {
        let hue = 0;
        let saturation = RNG.generateNumber(20, 30);
        let brightness = RNG.generateNumber(10, 20);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
