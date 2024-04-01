import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

let pichai = new PichaiUX();
pichai.initialize();

let picker = document.getElementById('colorPicker');

picker.onmouseover = function () {
    if (!window.EyeDropper) {
        resultElement.textContent =
          "Your browser does not support the EyeDropper API";
        return;
      }
    
      const eyeDropper = new EyeDropper();
    
      eyeDropper
        .open()
        .then((result) => {
            //result.sRGBHex to get hex code
          console.log(result.sRGBHex);
        })
        .catch((e) => {
            console.log(e)
        });
}