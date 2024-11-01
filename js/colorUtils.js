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

function RGBToHSL(r, g, b) {
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

function rgbToCmyk(r, g, b) {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k = Math.min(c, Math.min(m, y));

  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);

  // Optionally, round the values to percentages
  c = Math.round(c * 100);
  m = Math.round(m * 100);
  y = Math.round(y * 100);
  k = Math.round(k * 100);

  return `${c}, ${m}, ${y}, ${k}`;
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

let colorAssociations = {
  red: ['Action', 'Strength', 'Energy', 'Passion', 'Attention', 'Motivates', 'Stimulates', 'Cautions', 'Sexuality', 'Courage', 'Desire', 'Confidence', 'Anger', 'Danger', 'Revenge', 'Aggresion'],
  lightred: ['Action', 'Strength', 'Energy', 'Passion', 'Attention', 'Motivates', 'Stimulates', 'Cautions', 'Sexuality', 'Courage', 'Desire', 'Confidence', 'Anger', 'Danger', 'Revenge', 'Aggresion'],

  orange: ['Emotion', 'Youth', 'Optimism', 'Enthusiasm', 'Encourages', 'Uplifts', 'Stimulates', 'Communicate', 'Spontaneity', 'Creativity', 'Warmth', 'Positivity', 'Exhibitionsism', 'Superficial', 'Impatient', 'Domination'],
  coral: ['Emotion', 'Youth', 'Optimism', 'Enthusiasm', 'Encourages', 'Uplifts', 'Stimulates', 'Communicate', 'Spontaneity', 'Creativity', 'Warmth', 'Positivity', 'Exhibitionsism', 'Superficial', 'Impatient', 'Domination'],

  brown: ['Reliability', 'Stability', 'Honesty', 'Comfort', 'Simplifies', 'Protects', 'Grounds', 'Stabilizes', 'Appreciation', 'Support', 'Wisdom', 'Dependable', 'Boring', 'Dull', 'Timid', 'Predicatble'],

  yellow: ['Happiness', 'Optimism', 'Positivity', 'Intellect', 'Clarifies', 'Inspires', 'Amuses', 'Energizes', 'Creativity', 'Perception', 'Warmth', 'Mentality', 'Cowardice', 'Deception', 'Egotism', 'Caution'],
  gold: ['Happiness', 'Optimism', 'Positivity', 'Intellect', 'Clarifies', 'Inspires', 'Amuses', 'Energizes', 'Creativity', 'Perception', 'Warmth', 'Mentality', 'Cowardice', 'Deception', 'Egotism', 'Caution'],

  green: ['Harmony', 'Safety', 'Growth', 'Health', 'Revitalizes', 'Balances', 'Relaxes', 'Encourages', 'Generosity', 'Hope', 'Prosperity', 'Luck', 'Judge mental', 'Envy', 'Materialism', 'Inexperience'],
  lime: ['Harmony', 'Safety', 'Growth', 'Health', 'Revitalizes', 'Balances', 'Relaxes', 'Encourages', 'Generosity', 'Hope', 'Prosperity', 'Luck', 'Judge mental', 'Envy', 'Materialism', 'Inexperience'],

  lightblue: ['Compassion', 'Calmness', 'Clarity', 'Communicate', 'Balances', 'Clarifies', 'Calms', "Stablilizes", 'Concetrate', 'Growth', 'Peace', 'Empathy', 'Narcissism', 'Stress', 'Secrecy', 'Boastfullness'],
  aqua: ['Compassion', 'Calmness', 'Clarity', 'Communicate', 'Balances', 'Clarifies', 'Calms', "Stablilizes", 'Concetrate', 'Growth', 'Peace', 'Empathy', 'Narcissism', 'Stress', 'Secrecy', 'Boastfullness'],
  blue: ['Security', 'Trust', 'Loyality', 'Responsible', 'Protects', 'Calms', 'Relaxes', 'Supports', 'Confidence', 'Peace', 'Honesty', 'Reliability', 'Conservative', 'Passive', 'Depressed', 'Predictable'],
  navy: ['Security', 'Trust', 'Loyality', 'Responsible', 'Protects', 'Calms', 'Relaxes', 'Supports', 'Confidence', 'Peace', 'Honesty', 'Reliability', 'Conservative', 'Passive', 'Depressed', 'Predictable'],

  purple: ['Spirituality', 'Mystery', 'Royality', 'Imagination', 'Enlightens', 'Inspires', 'Uplifts', 'Encourages', 'Compassion', 'Fantasy', 'Wisdom', 'Creativity', 'Sensitive', 'Vigilant', 'Immature', 'Emotional'],

  violet : ['Compassion', 'Love', 'Feminity', 'Playfullness', 'Sympathizes', 'Calms', 'Nurtures', 'Comforts', 'Kindness', 'Warmth', 'Romance', 'Intuition', 'Emotional', 'Timid', 'Immature', 'Unconfident'],
  pink : ['Compassion', 'Love', 'Feminity', 'Playfullness', 'Sympathizes', 'Calms', 'Nurtures', 'Comforts', 'Kindness', 'Warmth', 'Romance', 'Intuition', 'Emotional', 'Timid', 'Immature', 'Unconfident'],

  black: ['Protection', 'Power', 'Ellegance', 'Sophisticated', 'Mysifies', 'Seduces', 'Secures', 'Intimidates', 'Formality', 'Strength', 'Prestige', 'Authority', 'Depression', 'Sadness', 'Pessimism', 'Dominance'],

  white: ['Cleanliness', 'Purity', 'Innocence', 'Perfection', 'Refreshes', 'Balances', 'Purifies', 'Simplifies', 'Goodness', 'Hope', 'Clarity', 'Openness', 'Boring', 'Cold', 'Empty', 'Distance']
};

function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928
          ? v / 12.92
          : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export { hexToRgb, RGBToHSL, rgbToCmyk, rgbToHex, hslToHex, cmykToHex, colorAssociations, luminance }