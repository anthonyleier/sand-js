export default class Particle {
    constructor() {
        this.color = this.generateColor();
        this.fixed = true;
        this.density = 0;
        this.timeLeft = "infinity";
        this.flammable = false;
        this.meltable = false;
    }

    generateNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateColor() {
        let hue = 0;
        let saturation = 0;
        let brightness = 0;
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
