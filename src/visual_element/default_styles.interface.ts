export interface IVisualElementStyles {
    [key : string] : any;
}

export const DefaultVisualElementStyles : IVisualElementStyles = {}

export interface IPolygonStyles extends IVisualElementStyles {
    color? : string,
    line_width? : number,
    fill_color? : string,
}

export const DefaultPolygonStyles : IPolygonStyles = {
    color : "#fff",
    line_width : 2,
    fill_color : "#fff",
}