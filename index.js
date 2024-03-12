const ntc = require('ntcjs');
const customColors = require('./customColors.js');
const nearestColors = require('./nearestCOlorFInder.js'); // damm im good at typing
const utils = require('./colorUTils.js');
const hexToHsl = require('hex-to-hsl');

const gen = require('./palleteGen.js');

const extract = require('./extractColors.js');

const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

  app.get("/picker", (request, response) => {
   let source = request.query.sourceColor;
   let nearestColorAmount = request.query.colorsAmount ?? 1;
   let allowedColors = request.query.allowedColors ?? ['#008dcd','#0249BA','#027DBA'];
   let pallete = request.query.pallete ?? source;

     const status = {
        "Status": "Running"
     };

     let name = ntc.name(source)[1];

     let customNamesKeys = Object.keys(customColors.names)
     if(customNamesKeys.includes(source)) {
      name = customColors.names[source];
     }

     let nearest = nearestColors.closestColors(source, allowedColors, nearestColorAmount);
     extract.extractColorPallete(request.query.image, allowedColors).then(function (imagePallete) {
      console.log(imagePallete);
      response.send({
         sourceColor: source,
         rgb: utils.hexToRgb(source),
         hsl: hexToHsl(source),
         colorName: name,
         nearestColors: nearest,
         imageColoPallete: imagePallete,
         pallete: gen.generatePallete(pallete)
        });
     });
  });