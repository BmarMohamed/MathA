interface IRender {
    [key : string] : any;
    width? : number,
    height? : number,
    domain? : [number, number],
    range? : [number, number],
    matrix? : [[number, number], [number, number]],
    visible? : boolean,
}
interface IGradientColors {
    gradient_start_position? : [number, number];
    gradient_end_position? : [number, number];
    gradient_colors? : Record<string, number>;
    apply_gradient_on? : "stroke" | "fill" | "both" | "none",
} 
interface IOpacity {
    opacity? : number;
}
interface ILine {
    line_width? : number;
}
interface IStroke extends IGradientColors, IOpacity, ILine {
    stroke_color? : string;
}
interface IFill extends IGradientColors, IOpacity {
    fill_color? : string;
}
interface IDrawStyle extends IFill, IStroke {
    draw_style? : "stroke" | "fill" | "both";
}
interface IFont extends IDrawStyle {
    font_size? : number,
    max_width? : number,
    font_family? : string,
    text_direction? : "ltr" | "rtl",
    font_weight? : string,
}
export { IRender, IGradientColors, IOpacity, ILine, IStroke, IFill, IDrawStyle }
export interface IPolygonElement extends IRender , IDrawStyle {
    radius? : number;
    angles? : number[] | number;
    center? : [number, number];
    start_angle? :number;
}
export interface ILineElement extends IRender, IStroke {
    from? : [number, number],
    to? : [number, number]
}
export interface IPointsElement extends IRender, IDrawStyle {
    points? : [number, number][];
    radius? : number,
}
export interface IPathElement extends IRender, IDrawStyle {
    points? : [number, number][];
}
export interface ITextElement extends IRender, IFont {
    text? : string
    position? : [number, number],
}
export interface ICoordinatesPlaneElement extends IRender, IStroke {
    start_point? : [number, number],
    end_point? : [number, number],
    v_lines? : number[],
    h_lines? : number[],
}
export interface IGraphElement extends IRender, IDrawStyle {
    graph_domains? : [number, number][];
    unwanted_domains? :[number, number][];
    expression? : (x : number) => number;
    x_step? : number;
    y_points_after_decimal_point? : number;
    points_properties? : IPointsElement,
    holes_properties? : IPointsElement,
}