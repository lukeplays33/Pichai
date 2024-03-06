const requireFromUrl = require('require-from-url/sync');
const ai = requireFromUrl('https://cdn.jsdelivr.net/npm/brain.js');

const net = new ai.NeuralNetwork({
  inputSize: 1,
});

net.train([
    { input: 'red', output: ['mint-green','very peri','warm white','blue','black','white'] },
    { input: 'green', output: ['mustard yellow', 'terra cota','terquoise','gold','',''] },
    { input: 'blue', output: ['golden  yellow','cool white','terra cota','zilver','',''] },
    { input: 'brown', output: ['pastel pink','navy blue','mustard yellow','teal','white',''] },
    { input: 'orange', output: ['royal blue','pewter','slate blue','brick red','',''] },
    { input: 'yellow', output: ['slate blue','warm white','brown','red','',''] },
    { input: 'pink', output: ['teal','black','rose gold','periwinkle','mustard yellow',''] },
    { input: 'purple', output: ['brown','terquoise','cool gray','ash blue','plum','sage green'] },
    { input: 'white', output: ['black','silver','light blue','red','pink',''] },
    { input: 'black', output: ['golden yellow','charcoal black','taupe','teal','royal fuchsia',''] }
  ]);

  function generatePallete (color = 'red') {
    let result = net.run([color]);
    console.log(result)
  }

  module.exports = { generatePallete };