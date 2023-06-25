import IColor from "../../interfaces/color.interface";
import Colors from "../../colors.lib.js";

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
        this.color = Colors.ColorToHex(this); 
    }
    getColor() {
        return {
            red : this.red,
            green : this.green,
            blue : this.blue,
        }
    }
    getColorArray() {
        return [this.red, this.green, this.blue];
    }
}

export default RGB;