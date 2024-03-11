const hexToHsl = require('hex-to-hsl');

let colorAssociations = {
  'light blue': ['refreshing', 'confident', 'problem-solving', 'intelligent', 'forward-thinking', 'trustworthy', 'reflective', 'efficient', 'communicative'],
  'red': ['energetic', 'courageous', 'warm', 'adventurous', 'strong', 'exciting', 'abundant', 'vital', 'fun'],
  'orange': ['energetic', 'courageous', 'warm', 'adventurous', 'strong', 'exciting', 'abundant', 'vital', 'fun'],
  'blue': ['calm', 'safe', 'intelligent', 'communicative', 'efficient', 'corporate', 'trustworthy', 'reflective', 'cool'],
  'yellow': ['friendly', 'optimistic', 'confident', 'loyal', 'emotionally', 'strong', 'creative', 'joyfull'],
  'green': ['harmonious', 'balancing', 'natural', 'enduring', 'stable', 'environmental', 'restful', 'peaceful', 'new beginnings'],
  'purple': ['the man behind the slaughter', 'high quality', 'luxurious',' authentic', 'truthful', 'artistic', 'spiritual', 'serene', 'visionary']
}

function getBasicColorName(color) {
  let hue = hexToHsl(color)[0];
  console.log(hue)
  if(hue >= 0 && hue <= 15 || hue >= 330 && hue <= 360) {
    return 'red';
  } else if(hue >= 165 && hue <= 199) {
    return 'light blue';
  } else if(hue >= 15 && hue <= 42) {
    return 'orange';
  } else if(hue >= 199 && hue <= 244) {
    return 'blue';
  } else if(hue >= 42 && hue <= 69) {
    return 'yellow';
  } else if(hue >= 69 && hue <= 165) {
    return 'green';
  } else if(hue >= 244 && hue <= 286) {
    return 'purple';
  } else if(hue >= 286 && hue <= 330) {
    return 'pink';
  }
}

function generatePallete (pallete) {
  let words = [];
  if(pallete.includes('#')) {
    words = colorAssociations[getBasicColorName(pallete)];
    console.log(words)
  }
  console.log(pallete)
}

  module.exports = { generatePallete };