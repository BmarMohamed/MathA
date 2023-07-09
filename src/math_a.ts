import Animation from "./animation.class.js";
import VisualElement from "./visual_element/visual_element.class.js";
import ComplexVisualElement from "./visual_element/complex_visual_elements/complex_visual_element.class.js";
import Lib from "./lib/lib.js";
import Polygon from "./visual_element/elements/polygon.class.js";
import Line from "./visual_element/elements/line.class.js";
import Points from "./visual_element/elements/points.class.js";
import Path from "./visual_element/elements/path.class.js";
import Text from "./visual_element/elements/text.class.js";
import Graph from "./visual_element/complex_visual_elements/graph.class.js";

export default {
    Animation,
    VisualElement,
    ComplexVisualElement,
    Elements : {
        Polygon,
        Line,
        Points,
        Path,
        Text,
    },
    ComplexElements : {
        Graph,
    },
    Lib,
}