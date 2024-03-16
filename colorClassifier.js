const brain = require('./brain.js');

const utils = require('./colorUTils.js');

var net = new brain.NeuralNetwork();

net.train([
    {input: {'r': 0.255, 'g': 0.255, 'b': 0.255}, output: {'White':1}},
    {input: {'r': 0.254, 'g': 0.153, 'b': 0.0}, output: {'Orange':1}},
    {input: {'r': 0.255, 'g': 0.0, 'b': 0.155}, output: {'Magenta':1}},
    {input: {'r': 0.129, 'g': 0.198, 'b': 0.240}, output: {'Light Blue':1}},
    {input: {'r': 0.255, 'g': 0.222, 'b': 0.89}, output: {'Yellow':1}},
    {input: {'r': 0.139, 'g': 0.230, 'b': 0.39}, output: {'Light Green':1}},
    {input: {'r': 0.252, 'g': 0.32, 'b': 0.112}, output: {'Pink':1}},
    {input: {'r': 0.134, 'g': 0.133, 'b': 0.131}, output: {'Grey':1}},
    {input: {'r': 0.206, 'g': 0.106, 'b': 0.206}, output: {'Light Grey':1}},
    {input: {'r': 0.0, 'g': 0.136, 'b': 0.136}, output: {'Cyan':1}},
    {input: {'r': 0.183, 'g': 0.0, 'b': 0.244}, output: {'Purple':1}},
    {input: {'r': 0.0, 'g': 0.0, 'b': 0.255}, output: {'Blue':1}},
    {input: {'r': 0.149, 'g': 0.85, 'b': 0.41}, output: {'Brown':1}},
    {input: {'r': 0.0, 'g': 0.255, 'b': 0.0}, output: {'Green':1}},
    {input: {'r': 0.255, 'g': 0.0, 'b': 0.0}, output: {'Red':1}},
    {input: {'r': 0.0, 'g': 0.0, 'b': 0.0}, output: {'Black':1}},
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