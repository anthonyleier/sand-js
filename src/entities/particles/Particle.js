export default class Particle {
    constructor() {
        this.color = this.generateColor();
        this.fixed = true;
        this.density = 0;
        this.timeLeft = 'infinity';
        this.meltable = false;
    }

    generateNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
