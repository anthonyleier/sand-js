import Particle from "./Particle.js";

export default class Lava extends Particle {
    constructor() {
        super();
        this.color = this.generateColor();
        this.fixed = false;
        this.density = 3100;
        this.timeLeft = 'infinity';
        this.flammable = false;
        this.meltable = false;
    }

    generateColor() {
        let hue = 10;
        let saturation = 100;
        let brightness = this.generateNumber(45, 55);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
