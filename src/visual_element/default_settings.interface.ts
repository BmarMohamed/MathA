import Animation from "../animation.class.js"

export interface IVisualElementSettings {
    [key : string] : any;
    width? : number,
    height? : number,
    domain? : [number, number],
    range? : [number, number],
    position? : [number, number]
}

export const DefaultVisualElementSettings :  IVisualElementSettings = {
        width : Animation.getProperties().resolution[0],
        height : Animation.getProperties().resolution[1],
        domain : [-1, 1],
        range : [-1, 1],
        position : [0, 0],
}