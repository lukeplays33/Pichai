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

  export { hexToRgb, RGBToHSL, rgbToCmyk }