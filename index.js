import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';
import { ntc } from './js/ntc.js';

let pichai = new PichaiUX();
pichai.initialize();

let picker = document.getElementById('colorPicker');

let name = document.getElementById('colorName');
let hex = document.getElementById('hex');
let rgb = document.getElementById('rgb');

    let n_match = ntc.name(window.localStorage.getItem('previousColor') ?? '#008dcd');

    name.innerHTML = n_match[1];
    rgb.innerHTML = n_match[0];
    hex.innerHTML = window.localStorage.getItem('previousColor') ?? '#008dcd';

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
            window.localStorage.setItem('lastColor', result.sRGBHex);
            //result.sRGBHex to get hex code
            let n_match = ntc.name(result.sRGBHex);

            name.innerHTML = n_match[1];
            rgb.innerHTML = n_match[0];
            hex.innerHTML = result.sRGBHex;
        })
        .catch((e) => {
            console.log(e)
        });
}