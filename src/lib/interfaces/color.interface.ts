interface IColor {
    [key : string] : any;
    color : string;
    color_model : "HSB" | "HSL" | "RGB";
    getColor : () => unknown;
    getColorArray : () => number[];
}

export default IColor;