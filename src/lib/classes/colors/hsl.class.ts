import IColor from "../../interfaces/color.interface";

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
        // this.color = this.getHex(); 
    }
    getColor() {
        return {
            hue : this.hue,
            saturation : this.saturation,
            lightness : this.lightness,
        }
    }
    // getHex() {
    //     return `#
    //         ${this.hue.toString(16)} 
    //         ${this.saturation.toString(16)}
    //         ${this.lightness.toString(16)}
    //     `.replace(/(\s|\t)/g, "");        
    // }
}

export default HSL;