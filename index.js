const ntc = require('ntcjs');
const customColors = require('./customColors.js');
const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

  app.get("/picker", (request, response) => {
   let source = request.query.sourceColor;
     const status = {
        "Status": "Running"
     };

     let name = ntc.name(source)[1];

     let customNamesKeys = Object.keys(customColors.names)
     if(customNamesKeys.includes(source)) {
      name = customColors.names[source];
     }
     
     response.send({
      sourceColor: source,
      colorName: name,
     });
  });