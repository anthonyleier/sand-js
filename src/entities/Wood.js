export default class Wood {
    constructor() {
        this.color = this.generateColor();
    }

    generateRNG(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateColor() {
        let hue = 0;
        let saturation = this.generateRNG(20, 30);
        let brightness = this.generateRNG(10, 20);
        let hslColor = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
        return hslColor;
    }
}
