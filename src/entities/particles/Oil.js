import Particle from "./Particle.js";

export default class Oil extends Particle {
    constructor() {
        super();
        this.color = this.generateColor();
        this.fixed = false;
        this.density = 700;
        this.flammable = true;
        this.meltable = false;
    }

    generateColor() {
        let hue = 0;
        let saturation = 100;
        let brightness = this.generateNumber(5, 15);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
