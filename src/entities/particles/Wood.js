import Particle from "./Particle.js";

export default class Wood extends Particle {
    constructor() {
        super();
        this.color = this.generateColor();
        this.fixed = true;
        this.density = 600;
        this.flammable = true;
        this.meltable = true;
    }

    generateColor() {
        let hue = 0;
        let saturation = this.generateNumber(20, 30);
        let brightness = this.generateNumber(10, 20);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
