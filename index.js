import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';
import { ntc } from './js/ntc.js';

let pichai = new PichaiUX();
pichai.initialize();

let picker = document.getElementById('colorPicker');

let name = document.getElementById('colorName');

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
            let n_match = ntc.name("#6195ED");
            name.innerHTML = n_match
        })
        .catch((e) => {
            console.log(e)
        });
}