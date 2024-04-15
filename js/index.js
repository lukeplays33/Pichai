import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';
import { findColorClass } from 'https://lukeplays33.github.io/Pichai-UX/AI/colorClassFinder.js';
import { getTextColor } from 'https://lukeplays33.github.io/Pichai-UX/AI/textColorFInder.js';

import { ntc } from './ntc.js';
import { hexToRgb, RGBToHSL, rgbToCmyk } from './colorUtils.js';

import { getSimilarColors, addTile } from './utils.js';

let pichai = new PichaiUX();
pichai.initialize();

let i;

let picker = document.getElementById('colorPicker');

let name = document.getElementById('colorName');
let name2 = document.getElementById('colorName2');
let hex = document.getElementById('hex');
let rgb = document.getElementById('rgb');
let hsl = document.getElementById('hsl');
let cmyk = document.getElementById('cmyk');
let colorClass = document.getElementById('colorClass');

let similarColorHolder = document.getElementById('similarColorHolder');

let n_match = ntc.name(window.localStorage.getItem('lastColor') ?? '#008dcd');

let RGB = hexToRgb(n_match[0]);
RGB = RGB.substring(4, RGB.length - 1).split(',');
name.innerHTML = n_match[1];
name2.innerHTML = n_match[1];
rgb.value = RGB;
hsl.value = RGBToHSL(RGB[0], RGB[1], RGB[2]);
cmyk.value = rgbToCmyk(RGB[0], RGB[1], RGB[2]);
hex.value = window.localStorage.getItem('lastColor') ?? '#008dcd';
setColorClass(RGB[0], RGB[1], RGB[2]);

async function setColorClass(r, g, b) {
    colorClass.innerHTML = await findColorClass(r, g, b);
    colorClass.style.backgroundColor = await findColorClass(r, g, b);
    colorClass.style.color = await getTextColor(r, g, b);
}

picker.onclick = function () {
    if (!window.EyeDropper) {
        resultElement.textContent =
            "Your browser does not support the EyeDropper API";
        return;
    }

    const eyeDropper = new EyeDropper();

    eyeDropper
        .open()
        .then(async (result) => {
            window.localStorage.setItem('lastColor', result.sRGBHex);
            //result.sRGBHex to get hex code
            let n_match = ntc.name(result.sRGBHex);
            let RGB = hexToRgb(n_match[0]);
            RGB = RGB.substring(4, RGB.length - 1).split(',');

            name.innerHTML = n_match[1];
            name2.innerHTML = n_match[1];
            rgb.value = RGB;
            hsl.value = RGBToHSL(RGB[0], RGB[1], RGB[2]);
            cmyk.value = rgbToCmyk(RGB[0], RGB[1], RGB[2]);
            hex.value = result.sRGBHex;
            setColorClass(RGB[0], RGB[1], RGB[2]);

            for (i of getSimilarColors(result.sRGBHex)) {
                addTile(similarColorHolder,i);
            }
        })
        .catch((e) => {
            console.log(e)
        });
}