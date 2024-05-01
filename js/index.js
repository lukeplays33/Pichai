import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';
import { findColorClass } from 'https://lukeplays33.github.io/Pichai-UX/AI/colorClassFinder.js';
import { getTextColor } from 'https://lukeplays33.github.io/Pichai-UX/AI/textColorFInder.js';

import { ntc } from './ntc.js';
import { hexToRgb, RGBToHSL, rgbToCmyk, rgbToHex, hslToHex, cmykToHex } from './colorUtils.js';

import { getSimilarColors, addTile } from './utils.js';

let pichai = new PichaiUX();
pichai.initialize();

let i;

let picker = document.getElementById('colorPicker');

let name = document.getElementById('colorName');
let hex = document.getElementById('hex');
let rgb = document.getElementById('rgb');
let hsl = document.getElementById('hsl');
let cmyk = document.getElementById('cmyk');
let colorClass = document.getElementById('colorClass');

let shades = document.getElementById('shaded');
let tints = document.getElementById('tints');
let tones = document.getElementById('tones');

let similarColorHolder = document.getElementById('similarColorHolder');

function setInnerHTMLs(code) {
    window.localStorage.setItem('lastColor', code);
    //result.sRGBHex to get hex code
    let n_match = ntc.name(code);
    let RGB = hexToRgb(n_match[0]);
    RGB = RGB.substring(4, RGB.length - 1).split(',');

    name.innerHTML = n_match[1];
    rgb.value = RGB;
    hsl.value = RGBToHSL(RGB[0], RGB[1], RGB[2]);
    cmyk.value = rgbToCmyk(RGB[0], RGB[1], RGB[2]);
    hex.value = code;
    setColorClass(RGB[0], RGB[1], RGB[2]);

    for(i of document.getElementsByClassName('colorVariantsItem')) {
        i.innerHTML = code;
        i.style.backgroundColor = code;
    }
    
    similarColorHolder.innerHTML = '';
    for (i of getSimilarColors(code)) {
        addTile(similarColorHolder, i);
    }

    pichai.optimizeTextColor(similarColorHolder);
    pichai.optimizeTextColor(name);
}

async function setColorClass(r, g, b) {
    colorClass.innerHTML = await findColorClass(r, g, b);
    colorClass.style.backgroundColor = await findColorClass(r, g, b);
    colorClass.style.color = await getTextColor(r, g, b);
}

setInnerHTMLs(window.localStorage.getItem('lastColor') ?? '#008dcd');

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
            //result.sRGBHex to get hex code
            setInnerHTMLs(result.sRGBHex);
        })
        .catch((e) => {
            console.log(e)
        });
}

//change colors when user chages input value

hex.onchange = function () {
    setInnerHTMLs(hex.value);
}

rgb.onchange = function () {
    setInnerHTMLs(rgbToHex(rgb.value));
}

hsl.onchange = function () {
    setInnerHTMLs(hslToHex(hsl.value));
}

cmyk.onchange = function () {
    setInnerHTMLs(cmykToHex(cmyk.value))
}