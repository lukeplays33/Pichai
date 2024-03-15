const brain = require('./brain.js');

const utils = require('./colorUTils.js');

var net = new brain.NeuralNetwork();

net.train([
    {input: {'r': 0.255, 'g': 0.0, 'b': 0.0}, output: {'Red':1}},
    {input: {'r': 0.0, 'g': 0.255, 'b': 0.0}, output: {'Green':1}},
    {input: {'r': 0.0, 'g': 0.0, 'b': 0.255}, output: {'Blue':1}},
    {input: {'r': 0.0, 'g': 0.0, 'b': 0.0}, output: {'Black':1}},
    {input: {'r': 0.255, 'g': 0.255, 'b': 0.255}, output: {'White':1}},
    {input: {'r': 0.255, 'g': 0.255, 'b': 0.255}, output: {'White':1}},
    {input: {'r': 0.45, 'g': 0.204, 'b': 0.191}, output: {'Aqua':1}},
    {input: {'r': 0.183, 'g': 0.0, 'b': 0.244}, output: {'Purple':1}}
]);

function classifyColor (color) {
    let rgb = utils.hexToRgb(color);
    let output = net.run(rgb);
    let result = Math.max(... Object.values(output));

    console.log(rgb);
    console.log(output);

    let i;
    for(i of Object.keys(output)) {
        if(output[i] == result) {
            return i;
        }
    }

}

module.exports = { classifyColor };