const brain = require('./brain.js');

const utils = require('./colorUTils.js');

var net = new brain.NeuralNetwork();

net.train([{
    input: {}, output: {'red':1}
}
]);

function classifyColor (color) {
    var output = net.run(utils/utils.hexToRgb(color)); // { white: 0.99, black: 0.002 }
      console.log(output)
}

module.exports = { classifyColor };