import Particle from "./Particle.js";

export default class Sand extends Particle {
    constructor() {
        super();
        this.color = this.generateColor();
        this.fixed = false;
        this.density = 1602;
        this.flammable = false;
        this.meltable = true;
    }

    generateColor() {
        let hue = 45;
        let saturation = this.generateNumber(50, 70);
        let brightness = this.generateNumber(50, 60);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
