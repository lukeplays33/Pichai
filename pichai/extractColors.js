const getColors = require('get-image-colors');

let i;

function extractColorPallete(img, allowColors, length) {
  let options = { count: length };

  return new Promise((resolve, reject) => {
    getColors(img, options).then(colors => {
      // `colors` is an array of color objects
      resolve(colors.map(color => color.hex()));
    })
  });
}

module.exports = { extractColorPallete };