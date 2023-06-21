export interface IVisualElementStyles {
    [key : string] : any;
}
export const DefaultVisualElementStyles : IVisualElementStyles = {}
export interface IStrokeColor {
    stroke_color? : string;
    opacity? : number
}
export const DefaultStrokeColor : IStrokeColor = {
    stroke_color : "#ffffff",
    opacity : 1,
}
export interface IFillColor {
    fill_color? : string;
    opacity? : number
}
export const DefaultFillColor : IFillColor = {
    fill_color : "#ffffff",
    opacity : 1,
}
export interface IGradientColors {
    gradient_start_position? : [number, number];
    gradient_end_position? : [number, number];
    gradient_colors? : Record<string, number>;
    opacity? : number,
    gradient_enabled? :boolean,
}
export const DefaultGradientColors : IGradientColors = {
    gradient_start_position : [-8, -4.5],
    gradient_end_position : [8, 4.5],
    gradient_colors : {
        "#000000" : 0,
        "#ffffff" : 1,
    },
    opacity : 1,
    gradient_enabled : false,
}
export interface IDrawType {
    draw_type? : "stroke" | "fill";
}
export const DefaultDrawType : IDrawType = {
    draw_type : "stroke",
}
export interface ILine {
    line_width? : number;
}
export const DefaultLine : ILine = {
    line_width : 5,
}
export interface IPolygonStyles extends IVisualElementStyles, IStrokeColor, IFillColor, IDrawType, IGradientColors, ILine {}
export const DefaultPolygonStyles : IPolygonStyles = {
    ...DefaultFillColor,
    ...DefaultStrokeColor,
    ...DefaultGradientColors,
    ...DefaultLine,
    ...DefaultDrawType,
}
export interface IPathStyles extends IVisualElementStyles, IStrokeColor, IFillColor, IDrawType, IGradientColors, ILine {
}
export const DefaultPathStyles : IPathStyles = {
    ...DefaultFillColor,
    ...DefaultStrokeColor,
    ...DefaultGradientColors,
    ...DefaultLine,
    ...DefaultDrawType,
}
export interface ITextStyles extends IVisualElementStyles, IStrokeColor, IFillColor, IDrawType, IGradientColors {
    font_size? : number,
    max_width? : number,
    font_family? : string,
    text_direction? : "rtl" | "ltr",
    font_weight? : string,
}
export const DefaultTextStyles : ITextStyles = {
    ...DefaultFillColor,
    ...DefaultStrokeColor,
    ...DefaultGradientColors,
    ...DefaultDrawType,
    font_size : 16,
    max_width : 8,
    font_family : "sans-serif",
    text_direction : "ltr",
    font_weight : 'normal',
}







export interface ILineStyles extends IVisualElementStyles {
    color? : string,
    line_width? : number,
}
export const DefaultLineStyles : ILineStyles = {
    color : "#ffffff",
    line_width : 2,
}
export interface IGraphStyles extends IVisualElementStyles {
    color? : string,
    line_width? : number,
}
export const DefaultGraphStyles : IGraphStyles = {
    color : "#ffffff",
    line_width : 2,
}
export interface IPointsStyles extends IVisualElementStyles {
    radius? : number,
    color? : string,
    circle? : number,
}
export const DefaultPointsStyles : IPointsStyles = {
    ...DefaultVisualElementStyles,
    radius : 5,
    color : "#ffffff",
    circle : 0,
}
