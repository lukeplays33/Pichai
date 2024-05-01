function hexToRgb(hex) {
  // Remove the hash sign if it's included
  hex = hex.replace(/^#/, '');
 
  // Parse the hex values
  let bigint = parseInt(hex, 16);
 
  // Extract RGB components
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
return "rgb(" + r + ", " + g + ", " + b + ")";
}

function RGBToHSL(r,g,b) {
  // Make r, g, and b fractions of 1
  r = r / 255;
  g = g / 255;
  b = b / 255;

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  let h = 0;
  let s = 0;
  let l = (cmax + cmin) / 2;

  // Calculate hue
  if (delta === 0) {
      h = 0; // No difference
  } else if (cmax === r) {
      h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
      h = (b - r) / delta + 2;
  } else {
      h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) {
      h += 360;
  }

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Convert to percentage
  s = Math.round(s * 100);
  l = Math.round(l * 100);

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
  let c = value.split(',')[0] / 100;
  let m = value.split(',')[1] / 100;
  let y = value.split(',')[2] / 100;
  let k = value.split(',')[3] / 100;

  const red = Math.round(255 * (1 - c) * (1 - k));
  const green = Math.round(255 * (1 - m) * (1 - k));
  const blue = Math.round(255 * (1 - y) * (1 - k));
  //return hex color format
  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
}

export { hexToRgb, RGBToHSL, rgbToCmyk, rgbToHex, hslToHex, cmykToHex }