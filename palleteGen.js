const hexToHsl = require('hex-to-hsl');

let colorAssociations = {
  'light blue': ['refreshing', 'confident', 'problem-solving', 'intelligent', 'forward-thinking', 'trustworthy', 'reflective', 'efficient', 'communicative'],
  'red': ['energetic', 'courageous', 'warm', 'adventurous', 'strong', 'exciting', 'abundant', 'vital', 'fun'],
  'orange': ['energetic', 'courageous', 'warm', 'adventurous', 'strong', 'exciting', 'abundant', 'vital', 'fun'],
  'blue': ['calm', 'safe', 'intelligent', 'communicative', 'efficient', 'corporate', 'trustworthy', 'reflective', 'cool'],
  'yellow': ['friendly', 'optimistic', 'confident', 'loyal', 'emotionally', 'strong', 'creative', 'joyfull'],
  'green': ['harmonious', 'balancing', 'natural', 'enduring', 'stable', 'environmental', 'restful', 'peaceful', 'new beginnings'],
  'purple': ['the man behind the slaughter', 'high quality', 'luxurious',' authentic', 'truthful', 'artistic', 'spiritual', 'serene', 'visionary'],
  'pink': ['loving', 'fun','sensual','tranquil', 'soothing', 'warmth', 'feminine', 'nurturing', 'listening', 'emotional'],
  'brown': ['reliable', 'simplistic', 'supportive', 'natural','traditional', 'trustworthy', 'neutral'],
  'black': ['sophisticated', 'secure', 'modern', 'clear thinking', 'efficient', 'straight talking', 'uncompromising'],
  'white': ['sophisticated', 'secure', 'modern', 'clear thinking', 'efficient', 'straight talking', 'uncompromising'],
  'gray': ['conformism', 'adaptability', 'emotionless', 'neutral', 'cool', 'steady', 'exquisite formality', 'mature', 'intellect', 'balance'],
  'teal': ['trustworthiness', 'reliability', 'stability', 'endurance', 'calm']
}

function getBasicColorName(color) {
  let hue = hexToHsl(color)[0];
  let lighting = hexToHsl(color)[2];

  if((lighting >= 21 && lighting <= 65) && (hue >= 15 && hue <= 42)) {
    return 'brown';
  } else if ((lighting >= 21 && lighting <= 90) && hue == 0) {
    return 'gray';
  } else if( (lighting >= 0 && lighting <= 21) && hue == 0) {
    return 'black';
  } else if ((lighting >= 90 && lighting <= 100) && hue == 0) {
    return 'white';
  }

  if(hue >= 0 && hue <= 15 && hue >= 330 && hue <= 360) {
    return 'red';
  } else if(hue >= 173 && hue <= 199) {
    return 'light blue';
  } else if(hue >= 155 && hue <= 173) {
    return 'teal';
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
  let words = pallete;
  let colorPallete = {};
  if(pallete.includes('#')) {
    words = colorAssociations[getBasicColorName(pallete)];
  }

  //while(colorPallete.length <= 4) {

  //}
  console.log(words)
}

  module.exports = { generatePallete };