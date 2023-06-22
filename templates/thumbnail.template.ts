import MathA from "../src/math_a.js"

const { Animation, Path, Text} = MathA;

Animation.setResolution([1920, 1080]);
Animation.setBackground("#1a1a1a")
Animation.initialize();

const path1 = new Path(
    {
    points : [[5, 4.5], [8, 4.5], [8, 1.5]]
}, {
    line_width : 10,
    stroke_color : "#00ffff",
    draw_type : "fill",
    gradient_enabled : true,
    gradient_start_position : [6.5, 3],
    gradient_end_position : [8, 4.5],
    gradient_colors : {
        "#ff0000" : 0,
        "#ff5e00" : 1,
    }
}
)

const path2 = new Path(
    {
        points : [[-8, -0.5], [-8, 0.5], [-3, -4.5], [-4, -4.5]]
    }, {
        draw_type : "fill",
        gradient_enabled : true,
        gradient_start_position : [-6, -2.5],
        gradient_end_position : [-5.5, -2],
        gradient_colors : {
            "#ff0000" : 0,
            "#ff5e00" : 1,
        }
    }
)

const path3 = new Path(
    {
        points : [[-8, -1.5], [-8, -0.5], [-4, -4.5], [-5, -4.5]]
    }, {
        draw_type : "fill",
        gradient_enabled : true,
        gradient_start_position : [-6.5, -3],
        gradient_end_position : [-6, -2.5],
        gradient_colors : {
            "#ff0000" : 0,
            "#ff5e00" : 1,
        }
    }
)

const chapter = new Text(
    {
        origin : [-0.5,3],
        text : ".الفصل 0 : المنحنيات البيانية",
    }, {
        font_size : 100,
        draw_type : "fill",
        font_family : "Cairo",
        font_weight : "700",
        max_width : 12
    }
)
console.log(chapter)

const lesson1 = new Text(
    {
        origin : [3,-0.5],
        text : "ماهي المنحنيات البيانية",
    }, {
        font_size : 100,
        draw_type : "fill",
        font_family : "Cairo",
        font_weight : "700",
        max_width : 12
    }
)
console.log(lesson1)

const lesson2 = new Text(
    {
        origin : [1,-2],
        text : "وعلاقتها بالمعادلات",

    }, {
        font_size : 100,
        draw_type : "fill",
        font_family : "Cairo",
        font_weight : "700",
        max_width : 12
    }
)

const lesson_number = new Text({
    origin : [-7.25,-3.75],
    text : "1",
}, {
    font_size : 150,
    draw_type : "fill",
    font_family : "Cairo",
    font_weight : "700",
    max_width : 12
}
)

const course_title = new Text({
    origin : [5.45,-4.20],
    text : "learn calculus",
}, {
    font_size : 100,
    draw_type : "fill",
    font_family : "Cairo",
    font_weight : "700",
    max_width : 12
}
)
Animation.at(0)
    .doAction(path1, "draw")
    .doAction(path2, "draw")
    .doAction(path3, "draw")
    .doAction(chapter, "write")
    .doAction(lesson1, "write")
    .doAction(lesson2, "write")
    .doAction(course_title, "write")
    .doAction(lesson_number, "write");

Animation.start();