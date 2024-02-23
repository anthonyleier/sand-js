import Particle from "./Particle.js";

export default class Fire extends Particle {
    constructor(timeLeft = 60) {
        super();
        this.color = this.generateColor();
        this.fixed = true;
        this.density = 0;
        this.timeLeft = timeLeft;
        this.flammable = false;
        this.meltable = false;
    }

    updateColor() {
        this.color = this.generateColor();
    }

    generateColor() {
        let hue = this.generateNumber(0, 50);
        let saturation = 100;
        let brightness = 50;
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
