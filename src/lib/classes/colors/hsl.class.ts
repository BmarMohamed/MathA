import IColor from "../../interfaces/color.interface";
import Colors from "../../colors.lib.js";

class HSL implements IColor {
    constructor(hue : number, saturation : number, lightness : number) {
        this.setColor(hue, saturation, lightness);
    }
    color! : string;
    public readonly color_model = "HSL";
    private hue! : number;
    private saturation! : number;
    private lightness! : number;
    setColor(hue : number, saturation : number, lightness : number) {
        this.hue = hue;
        this.saturation = saturation;
        this.lightness = lightness;
        this.color = Colors.ColorToHex(this); 
    }
    getColor() {
        return {
            hue : this.hue,
            saturation : this.saturation,
            lightness : this.lightness,
        }
    }
    getColorArray() {
        return [this.hue, this.saturation, this.lightness];
    }
}

export default HSL;