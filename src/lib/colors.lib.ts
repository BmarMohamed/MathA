import RGB from "./classes/colors/rgb.class.js";
import HSL from "./classes/colors/hsl.class.js";
import HSB from "./classes/colors/hsb.class.js";
import IColor from "./interfaces/color.interface.js";

const Colors = {
  RGBToHSL(color : RGB) : HSL {
        const r = color.getColor().red / 255;
        const g = color.getColor().green / 255;
        const b = color.getColor().blue / 255;
        const l = Math.max(r, g, b);
        const s = l - Math.min(r, g, b);
        const h = s
          ? l === r
            ? (g - b) / s
            : l === g
            ? 2 + (b - r) / s
            : 4 + (r - g) / s
          : 0;
        return new HSL(
          ...[
            Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
            Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
            Math.round((100 * (2 * l - s)) / 2),
          ]  as [number, number, number]
        );
  },
  HSLToRGB(color : HSL) : RGB {
        const s = color.getColor().saturation / 100;
        const l = color.getColor().lightness / 100;
        const k = (n : number) => (n + color.getColor().hue / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n : number) =>
          l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return new RGB(...[Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))] as [number, number, number]);
  },
  RGBToHSB(color : RGB) : HSB {
      const r = color.getColor().red / 255;
      const g = color.getColor().green / 255;
      const b = color.getColor().blue / 255;
      const v = Math.max(r, g, b),
        n = v - Math.min(r, g, b);
      const h =
        n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
      return new HSB(...[Math.round(60 * (h < 0 ? h + 6 : h)),Math.round( v && (n / v) * 100),Math.round( v * 100)] as [number, number, number]);
  },
  HSBToRGB(color : HSB) : RGB {
    const s = color.getColor().saturation / 100;
    const v = color.getColor().brightness / 100;
    const k = (n : number) => (n + color.getColor().hue / 60) % 6;
    const f = (n : number) => v * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return new RGB(...[Math.round(255 * f(5)),Math.round( 255 * f(3)),Math.round( 255 * f(1))] as [number, number, number]);
  },
  HSLToHSB(color : HSL) : HSB {
    return Colors.RGBToHSB(Colors.HSLToRGB(color))
  },
  HSBToHSL(color : HSB) : HSL {
    return Colors.RGBToHSL(Colors.HSBToRGB(color));
  },
  ColorToHex(color : IColor) : string {
    let rgb : RGB;
    if(color instanceof HSB) rgb = Colors.HSBToRGB(color);
    else if(color instanceof HSL) rgb = Colors.HSLToRGB(color);
    else rgb = color as RGB;
    return `#
      ${rgb.getColor().red.toString(16).length == 1? '0' + rgb.getColor().red.toString(16) : rgb.getColor().red.toString(16)} 
      ${rgb.getColor().green.toString(16).length == 1? '0' + rgb.getColor().green.toString(16) : rgb.getColor().green.toString(16)}
      ${rgb.getColor().blue.toString(16).length == 1? '0' + rgb.getColor().blue.toString(16) : rgb.getColor().blue.toString(16)}
  `.replace(/(\s|\t)/g, "");
  },
  HexToColor(hex : string, color_model : "RGB" | "HSB" | "HSL") : IColor {
    let red = Number.parseInt(hex[1] + hex[2], 16);
    let green = Number.parseInt(hex[3] + hex[4], 16);
    let blue = Number.parseInt(hex[5] + hex[6], 16);
    if(color_model == "RGB") return new RGB(red, green, blue);
    else if(color_model == "HSB") return Colors.RGBToHSB(new RGB(red, green, blue));
    else return Colors.RGBToHSL(new RGB(red, green, blue));
  }
}

export default Colors;