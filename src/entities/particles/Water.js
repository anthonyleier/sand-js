import Particle from "./Particle.js";

export default class Water extends Particle {
    constructor() {
        super();
        this.color = this.generateColor();
        this.fixed = false;
        this.density = 997;
        this.timeLeft = 'infinity';
        this.flammable = false;
        this.meltable = false;
    }

    generateColor() {
        let hue = 218;
        let saturation = this.generateNumber(90, 100);
        let brightness = this.generateNumber(40, 50);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
