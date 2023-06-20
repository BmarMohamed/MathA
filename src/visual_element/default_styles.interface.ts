export interface IVisualElementStyles {
    [key : string] : any;
}
export const DefaultVisualElementStyles : IVisualElementStyles = {

}
export interface IPolygonStyles extends IVisualElementStyles {
    color? : string,
    line_width? : number,
    fill_color? : string,
}
export const DefaultPolygonStyles : IPolygonStyles = {
    color : "#ffffff",
    line_width : 2,
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
export interface IPathStyles extends IVisualElementStyles {
    color? : string,
    stroke? : number,
    gradient? : boolean,
    gradient_xy? : [[number, number], [number, number]];
}
export const DefaultPathStyles : IPathStyles = {
    ...DefaultVisualElementStyles,
    color : "#ffffff",
    stroke : 0,
}
export interface IWordStyles extends IVisualElementStyles {
    color? : string,
    type? : "stroke" | "fill",
    font_size? : number,
}
export const DefaultWordStyles : IWordStyles = {
    ...DefaultVisualElementStyles,
    color : "#ffffff",
    type : "fill",
    font_size : 16,
}
