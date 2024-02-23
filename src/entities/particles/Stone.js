import Particle from "./Particle.js";

export default class Stone extends Particle {
    constructor() {
        super();
        this.color = this.generateColor();
        this.fixed = true;
        this.density = 2800;
        this.timeLeft = 'infinity';
        this.flammable = false;
        this.meltable = false;
    }

    generateColor() {
        let hue = 0;
        let saturation = 0;
        let brightness = this.generateNumber(20, 30);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
