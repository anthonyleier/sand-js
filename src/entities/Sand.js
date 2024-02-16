export default class Sand {
    constructor() {
        this.color = this.generateColor();
    }

    generateRNG(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateColor() {
        let hue = 45;
        let saturation = this.generateRNG(50, 70);
        let brightness = this.generateRNG(50, 60);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
