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
