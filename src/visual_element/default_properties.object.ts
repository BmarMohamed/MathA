import { 
    IRender,
    IOpacity, 
    IFill, 
    ILine, 
    IStroke, 
    IDrawStyle, 
    IGradientColors, 
    IPolygonElement,
    ILineElement,
    IGraphElement,
    IPointsElement,
    IPathElement,
    ITextElement,
} from "./properties.interface.js";

export const Render : IRender = {
    width : 0,
    height : 0,
    domain : [-8 , 8],
    range : [-4.5, 4.5],
    position : [0, 0],
    transform_matrix : [[1, 0], [0, 1]],
}
const GradientColors : IGradientColors = {
    gradient_start_position : [-8, -4.5],
    gradient_end_position : [8, 4.5],
    gradient_colors : {
        "#000000" : 0,
        "#ffffff" : 1,
    },
    gradient_enabled : false,
}
const Opacity : IOpacity = {
    opacity : 1,
}
const Line : ILine = {
    line_width : 5,
}
const Stroke : IStroke = {
    ...GradientColors,
    ...Opacity,
    ...Line,
    stroke_color : "#ffffff",
}
const Fill : IFill = {
    ...GradientColors,
    ...Opacity,
    fill_color : "#ffffff",
}
const DrawStyle : IDrawStyle = {
    ...Stroke,
    ...Fill,
    draw_style : "both",
}
export const DefaultPolygonProperties : IPolygonElement = {
    ...Render,
    ...DrawStyle,
    radius : 1,
    angles : 120,
    rotation : 0,
    center : [0, 0],
}
export const DefaultLineProperties : ILineElement = {
    ...Render,
    ...Stroke,
    from : [-1, -1],
    to : [1, 1],
}
export const DefaultGraphProperties : IGraphElement = {
    ...Render,
    ...Stroke,
    graph_domains : [[-1, 1]],
    unwanted_points_and_domains : [],
    expression : (x : number) => x,
    x_step : 0.01,
    y_points_after_decimal_point : 5,
}
export const DefaultPointsProperties : IPointsElement = {
    ...Render,
    ...DrawStyle,
    points : [[0,0]],
    radius : 1,
}
export const DefaultPathProperties : IPathElement = {
    ...Render,
    ...DrawStyle,
    points : [],
}
export const DefaultTextProperties : ITextElement = {
    ...DrawStyle,
    ...Render,
    font_size : 16,
    max_width : 8,
    font_family : "sans-serif",
    text_direction : "ltr",
    font_weight : 'normal',
    text : "text"
}