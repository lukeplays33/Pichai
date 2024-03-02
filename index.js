const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

  app.get("/picker", (request, response) => {
   console.log(request)
     const status = {
        "Status": "Running"
     };
     
     response.send(status);
  });