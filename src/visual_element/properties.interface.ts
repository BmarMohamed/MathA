interface IRender {
    [key : string] : any;
    width? : number,
    height? : number,
    domain? : [number, number],
    range? : [number, number],
    position? : [number, number],
    transform_matrix? : [[number, number], [number, number]],
    origin? : [number, number],
}
interface IGradientColors {
    gradient_start_position? : [number, number];
    gradient_end_position? : [number, number];
    gradient_colors? : Record<string, number>;
    gradient_enabled? :boolean,
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
    draw_style? : "stroke" | "fill";
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
    rotation? : number;
}
export interface ILineElement extends IRender, IStroke {
    from? : [number, number],
    to? : [number, number]
}
export interface IGraphElement extends IRender, IStroke {
    graph_domains? : Array<[number, number] | number>;
    unwanted_points_and_domains? : Array<[number, number] | number>;
    expression? : (x : number) => number;
    x_step? : number;
    y_points_after_decimal_point? : number;
}
export interface IPointsElement extends IRender, IDrawStyle {
    points? : [number, number][];
    radius? : number,
}
export interface IPathElement extends IRender, IDrawStyle {
    points? : [number, number][];
}
export interface ITextElement extends IRender, IFont {
    text? : string,
}