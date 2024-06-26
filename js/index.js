import { findColorClass } from 'https://lukeplays33.github.io/Pichai-UX/AI/colorClassFinder.js';
import { getTextColor } from 'https://lukeplays33.github.io/Pichai-UX/AI/textColorFInder.js';

import { ntc } from './ntc.js';
import { hexToRgb, RGBToHSL, rgbToCmyk, rgbToHex, hslToHex, cmykToHex, colorAssociations } from './colorUtils.js';

import { getSimilarColors, addTile } from './utils.js';

import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

let pichai = new PichaiUX();
pichai.initialize();
console.log(pichai.getListOfElements());

let i;

let colorPicker = document.getElementById('colorpicker');

let making = document.getElementById('making');
let howTo = document.getElementById('howTo');
let associated = document.getElementById('associtation');

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

function getColorAssociation(name) {
    let className = colorClass.innerHTML;
    let association = '';

    for (i of colorAssociations[className]) {
        association = association + (`<li>${i}</li>`);
    }

    return `${name} is a ${className}-ish color that is often associated with: <br> <ul>${association}</ul>`

}

async function setInnerHTMLs(code) {
    localforage.setItem('lastColor', code);
    //result.sRGBHex to get hex code
    let n_match = ntc.name(code);

    let RGB = hexToRgb(n_match[0]);
    RGB = RGB.substring(4, RGB.length - 1).split(',');

    let CMYK = rgbToCmyk(RGB[0], RGB[1], RGB[2]);

    name.innerHTML = n_match[1];
    making.innerHTML = `How to make ${n_match[1]}`;

    rgb.value = RGB;
    hsl.value = RGBToHSL(RGB[0], RGB[1], RGB[2]);
    cmyk.value = CMYK;
    hex.value = code;

    CMYK = CMYK.split(',');

    howTo.innerHTML = `To make the color ${name.innerHTML} well be using the CMYK system this system is often used for printers but can also be used for mixing paint.
    <br><br>

    To start grab a bucket and use a syringe or measuring cup and add ${CMYK[0]}% of cyan, ${CMYK[1]}% of magenta and ${CMYK[2]}% of yellow paint to to the bucket.
    <br><br>
    
    Now mix it till you got the desired color, additionally you can add black (k) or white to change its contrast.
    `

    setColorClass(RGB[0], RGB[1], RGB[2]);

    for (i of document.getElementsByClassName('colorVariantsItem')) {
        i.innerHTML = code;
        i.style.backgroundColor = code;
    }

    similarColorHolder.innerHTML = '';
    console.log('test')
    for (i of await getSimilarColors(code)) {
        addTile(similarColorHolder, i);
    }

    pichai.optimizeTextColor(similarColorHolder);
    pichai.optimizeTextColor(name);
}

async function setColorClass(r, g, b) {
    colorClass.innerHTML = await findColorClass(r, g, b);
    colorClass.style.backgroundColor = await findColorClass(r, g, b);
    colorClass.style.color = await getTextColor(r, g, b);

    associated.innerHTML = await getColorAssociation(name.innerHTML);
}
localforage.getItem('lastColor').then(function(value) {
    setInnerHTMLs(value ?? '#008dcd');
}); //set value back to the one set 

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

colorPicker.addEventListener('change', function () {
    setInnerHTMLs(colorPicker.getAttribute('value'));
});