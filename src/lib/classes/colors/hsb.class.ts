import IColor from "../../interfaces/color.interface";
import Colors from "../../colors.lib.js";

class HSB implements IColor {
    constructor(hue : number, saturation : number, brightness : number) {
        this.setColor(hue, saturation, brightness);
    }
    color! : string;
    public readonly color_model = "HSB";
    private hue! : number;
    private saturation! : number;
    private brightness! : number;
    setColor(hue : number, saturation : number, brightness : number) {
        this.hue = hue;
        this.saturation = saturation;
        this.brightness = brightness;
        this.color = Colors.ColorToHex(this); 
    }
    getColor() {
        return {
            hue : this.hue,
            saturation : this.saturation,
            brightness : this.brightness,
        }
    }
    getColorArray() {
        return [this.hue, this.saturation, this.brightness];
    }
}

export default HSB;