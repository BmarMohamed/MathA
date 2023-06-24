import IColor from "../../interfaces/color.interface";

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
        // this.color = this.getHex(); 
    }
    getColor() {
        return {
            hue : this.hue,
            saturation : this.saturation,
            brightness : this.brightness,
        }
    }
    // getHex() {
    //     return `#
    //         ${this.hue.toString(16)} 
    //         ${this.saturation.toString(16)}
    //         ${this.brightness.toString(16)}
    //     `.replace(/(\s|\t)/g, "");        
    // }
}

export default HSB;