const brain = require('./brain.js');

const utils = require('./colorUTils.js');

var net = new brain.NeuralNetwork();

net.train([
    {input: {'r': 255, 'g': 0, 'b': 0}, output: {'red':1}},
    {input: {'r': 0, 'g': 255, 'b': 0}, output: {'green':1}},
    {input: {'r': 0, 'g': 0, 'b': 255}, output: {'blue':1}},
    {input: {'r': 0, 'g': 0, 'b': 0}, output: {'black':1}},
    {input: {'r': 255, 'g': 255, 'b': 255}, output: {'white':1}},
    {input: {'r': 255, 'g': 255, 'b': 255}, output: {'white':1}},
    {input: {'r': 45, 'g': 204, 'b': 191}, output: {'aqua':1}},
    {input: {'r': 183, 'g': 0, 'b': 244}, output: {'purple':1}}
]);

function classifyColor (color) {
    let rgb = utils.hexToRgb(color);
    let output = net.run(rgb);
    let result = Math.max(... Object.values(output));

    let i;
    for(i of Object.keys(output)) {
        if(output[i] == result) {
            return i;
        }
    }

}

module.exports = { classifyColor };