import Animation from "../animation.class.js"

//VisualElement===============================================================================================

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

//Polygone===============================================================================================

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

//Line===============================================================================================

export interface ILineSettings extends IVisualElementSettings {
    from? : [number, number];
    to? : [number, number];
}
export const DefaultLineSettings : ILineSettings = {
    ...DefaultVisualElementSettings,
    from : [-1, -1],
    to : [1, 1]
}

