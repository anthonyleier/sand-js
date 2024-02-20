import RNG from "../RNG.js";

export default class Fire {
    constructor() {
        this.color = this.generateColor();
        this.fixed = true;
        this.density = 0;
        this.timeLeft = 30;
    }

    setCoordinates(i, j) {
        this.i = i;
        this.j = j;
    }

    updateColor() {
        this.color = this.generateColor();
    }

    generateColor() {
        let hue = RNG.generateNumber(0, 50);
        let saturation = 100;
        let brightness = 50;
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
