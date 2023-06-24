import IColor from "../../interfaces/color.interface";

class RGB implements IColor {
    constructor(red : number, green : number, blue : number) {
        this.setColor(red, green, blue);
    }
    color! : string;
    public readonly color_model = "RGB";
    private red! : number;
    private green! : number;
    private blue! : number;
    setColor(red : number, green : number, blue : number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.color = this.getHex(); 
    }
    getColor() {
        return {
            red : this.red,
            green : this.green,
            blue : this.blue,
        }
    }
    getHex() {
        return `#
            ${this.red.toString(16)} 
            ${this.green.toString(16)}
            ${this.blue.toString(16)}
        `.replace(/(\s|\t)/g, "");        
    }
}

export default RGB;