import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';
import { findColorClass } from 'https://lukeplays33.github.io/Pichai-UX/AI/colorClassFinder.js';
import { ntc } from './js/ntc.js';
import { hexToRgb } from './js/colorUtils.js';

let pichai = new PichaiUX();
pichai.initialize();

let picker = document.getElementById('colorPicker');

let name = document.getElementById('colorName');
let hex = document.getElementById('hex');
let rgb = document.getElementById('rgb');
let colorClass = dpcument.getElementById('colorClass');

    let n_match = ntc.name(window.localStorage.getItem('previousColor') ?? '#008dcd');

    let RGB = hexToRgb(n_match[0]);
    name.innerHTML = n_match[1];
    rgb.value = RGB
    hex.value = window.localStorage.getItem('previousColor') ?? '#008dcd';
    colorClass.innerHTML = findColorClass(RGB.substring(4, RGB.length - 1).split(','))

picker.onclick = function () {
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
            let RGB = hexToRgb(n_match[0]);

            name.innerHTML = n_match[1];
            rgb.value = RGB
            hex.value = result.sRGBHex;
            colorClass.innerHTML = findColorClass(RGB.substring(4, RGB.length - 1).split(','))
        })
        .catch((e) => {
            console.log(e)
        });
}