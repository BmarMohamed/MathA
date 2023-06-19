import Animation from "../animation.class.js"

export interface IVisualElementSettings {
    [key : string] : any;
    width? : number,
    height? : number,
    domain? : [number, number],
    range? : [number, number],
    position? : [number, number],
    origin? : [number, number],
}
export const DefaultVisualElementSettings : IVisualElementSettings = {
        width : 0,
        height : 0,
        domain : [-1, 1],
        range : [-1, 1],
        position : [0, 0],
        origin : [0, 0]
}
export interface IPolygonSettings extends IVisualElementSettings {
    radius? : number;
    angles? : number[] | number;
    rotation? : number;
    
}
export const DefaultPolygonSettings : IPolygonSettings = {
    ...DefaultVisualElementSettings,
    radius : 1,
    angles : 120,
    rotation : 0,
}
export interface ILineSettings extends IVisualElementSettings {
    from? : [number, number];
    to? : [number, number];
}
export const DefaultLineSettings : ILineSettings = {
    ...DefaultVisualElementSettings,
    from : [-1, -1],
    to : [1, 1]
}
export interface IGraphSettings extends IVisualElementSettings {
    graph_domains? : Array<[number, number] | number>;
    unwanted_points_and_domains? : Array<[number, number] | number>;
    expression? : (x : number) => number;
    x_step? : number;
    y_points_after_decimal_point? : number;
}
export const DefaultGraphSettings : IGraphSettings = {
    ...DefaultVisualElementSettings,
    graph_domains : [[-1, 1]],
    unwanted_points_and_domains : [],
    expression : (x : number) => x,
    x_step : 0.01,
    y_points_after_decimal_point : 5,
}
export interface IPointsSettings extends IVisualElementSettings {
    points? : [number, number][];
}
export const DefaultPointsSettings : IPointsSettings = {
    ...DefaultVisualElementSettings,
    points : [],
}
