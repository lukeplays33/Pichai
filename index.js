import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';
import { ntc } from './js/ntc.js';

let pichai = new PichaiUX();
pichai.initialize();

let picker = document.getElementById('colorPicker');

let name = document.getElementById('colorName');
let hex = document.getElementById('hex');
let rgb = document.getElementById('rgb');

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
            let n_match = ntc.name(result.sRGBHex);
            n_rgb = n_match[0]; // This is the RGB value of the closest matching color
            n_name = n_match[1]; // This is the text string for the name of the match

            name.innerHTML = n_name;
            rgb.innerHTML = n_rgb;
            hex.innerHTML = result.sRGBHex;
        })
        .catch((e) => {
            console.log(e)
        });
}