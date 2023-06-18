const Colors = {
//Check==========================================================================================================
    isRGBColor(rgb_color : string) {
        return /^#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})$/.test(rgb_color);
    },
    isHSLColor(hsl_color : [number, number, number]) {
        if(
            hsl_color[0] >= 0 && 
            hsl_color[0] <= 360 && 
            hsl_color[1] >= 0 && 
            hsl_color[1] <= 100 && 
            hsl_color[2] >= 0 && 
            hsl_color[2] <= 100
        ) return true;
        return false;
    },
//Convert==========================================================================================================
    RGBToHSL(color : string) : [number, number, number] {
        const r = Number.parseInt(color.slice(1, 3), 16) / 255;
        const g = Number.parseInt(color.slice(3, 5), 16) / 255;
        const b = Number.parseInt(color.slice(5, 7), 16) / 255;
        const l = Math.max(r, g, b);
        const s = l - Math.min(r, g, b);
        const h = s
          ? l === r
            ? (g - b) / s
            : l === g
            ? 2 + (b - r) / s
            : 4 + (r - g) / s
          : 0;
        return [
          60 * h < 0 ? 60 * h + 360 : 60 * h,
          100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
          (100 * (2 * l - s)) / 2,
        ];
      },

      HSLToRGB(h : number, s : number, l : number) : [number, number, number] {
        s /= 100;
        l /= 100;
        const k = (n : number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n : number) =>
          l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
      },

      RGBTupleToString(rgb_color : [number, number, number]) {
        return `#
          ${rgb_color[0].toString(16).length == 1? '0' + rgb_color[0].toString(16) : rgb_color[0].toString(16)} 
          ${rgb_color[1].toString(16).length == 1? '0' + rgb_color[1].toString(16) : rgb_color[1].toString(16)}
          ${rgb_color[2].toString(16).length == 1? '0' + rgb_color[2].toString(16) : rgb_color[2].toString(16)}
        `.replace(/(\s|\t)/g, "");
      },

      StringToRGBTuple(rgb_color : string) : [number, number, number]{
        return [
          Number.parseInt(rgb_color.slice(1, 3), 16),
          Number.parseInt(rgb_color.slice(3, 5), 16),
          Number.parseInt(rgb_color.slice(5, 7), 16),
        ]
      },

//Frames============================================================================================================
    HSLTransfromFrames(from : [number, number, number], to : [number, number, number], duration : number) {
        const dHSL = {
            dh : (to[0] - from[0]) / duration,
            ds : (to[1] - from[1]) / duration,
            dl : (to[2] - from[2]) / duration,
        }
        const frames : [number, number, number][] = []
        for(let i = 1; i <= duration; i++) {
            frames.push([
                from[0] + (dHSL.dh * i),
                from[1] + (dHSL.ds * i),
                from[2] + (dHSL.dl * i),
            ])
        }
        return frames
    },
    RGBTransfromFrames(from : [number, number, number], to : [number, number, number], duration : number) {
      const dRGB = {
          dr : (to[0] - from[0]) / duration,
          dg : (to[1] - from[1]) / duration,
          db : (to[2] - from[2]) / duration,
      }
      const frames : [number, number, number][] = []
      for(let i = 1; i <= duration; i++) {
          frames.push([
              from[0] + (dRGB.dr * i),
              from[1] + (dRGB.dg * i),
              from[2] + (dRGB.db * i),
          ])
      }
      return frames
  }
}

export default Colors