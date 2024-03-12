const getColors = require('get-image-colors');

let i;

const options = {
    count: 11,
  }

function extractColorPallete (img, allowColors) {
    return new Promise((resolve, reject) => {
    getColors(img, options).then(colors => {
        // `colors` is an array of color objects
        resolve(colors.map(color => color.hex()));
      })
    });
}

module.exports = { extractColorPallete };