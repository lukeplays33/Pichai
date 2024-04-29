function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
  }

  function RGBToHSL(r,g,b) {
      // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;


    // Calculate lightness
    l = (cmax + cmin) / 2;
  
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return `${h}, ${s}, ${l}`;
  }

  function rgbToCmyk(R, G, B) {
    if (R === 0 && G === 0 && B === 0) {
        return [0, 0, 0, 100]; // Black
    }

    const K = Math.max(1 - R / 255, 1 - G / 255, 1 - B / 255) * 100;
    const C = (1 - R / 255 - K / 100) * 100;
    const M = (1 - G / 255 - K / 100) * 100;
    const Y = (1 - B / 255 - K / 100) * 100;

    return `${C}, ${M}, ${Y}, ${K}`
}

function rgbToHex(value) {
  let r = value.split(',')[0];
  let g = value.split(',')[1];
  let b = value.split(',')[2];

  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function hslToHex(value) {
  let h = value.split(',')[0];
  let s = value.split(',')[1];
  let l = value.split(',')[2];

  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

//converts cmyk to hex
function cmykToHex(value) {
  let c = value.split(',')[0];
  let m = value.split(',')[1];
  let y = value.split(',')[2];
  let k = value.split(',')[3];

  var hex,
      rgb;
  //convert cmyk to rgb first
  rgb = cmykToRgb(c,m,y,k);
  //then convert rgb to hex
  hex = rgbToHexForCMYK(rgb.r, rgb.g, rgb.b);
  //return hex color format
  return hex;
}
//converts cmyk color to rgb
function cmykToRgb(c, m, y, k) {
var rgb_r,
  rgb_g,
  rgb_b,
  cyan = 100 *Number(c),
  magenta = 100 * Number(m),
  yellow = 100 * Number(y),
  black = 100 * Number(k); // fixed a typo
  0 < cyan ? cyan /= 100 : 0 < magenta ? magenta /= 100 : 0 < yellow ? yellow /= 100 : 0 < black && (black /= 100);
  rgb_r = 1 - Math.min(1, cyan * (1 - black) + black);
  rgb_g = 1 - Math.min(1, magenta * (1 - black) + black);
  rgb_b = 1 - Math.min(1, yellow * (1 - black) + black);
  rgb_r = Math.round(255 * rgb_r);
  rgb_g = Math.round(255 * rgb_g);
  rgb_b = Math.round(255 * rgb_b);
  return {r: rgb_r, g: rgb_g, b: rgb_b};
}

function rgbToHexForCMYK(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
  }
}

  export { hexToRgb, RGBToHSL, rgbToCmyk,rgbToHex, hslToHex, cmykToHex }