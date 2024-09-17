import { findColorClass } from 'https://lukeplays33.github.io/Pichai-UX/AI/colorClassFinder.js';
import { getTextColor } from 'https://lukeplays33.github.io/Pichai-UX/AI/textColorFInder.js';

import { ntc } from './ntc.js';
import { hexToRgb, RGBToHSL, rgbToCmyk, rgbToHex, hslToHex, cmykToHex, colorAssociations, luminance } from './colorUtils.js';

import { getSimilarColors, addTile, colourBlend } from './utils.js';

import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

let options = { homeLink: 'https://lukeplays33.github.io/Pichai/index.html' }

let pichai = new PichaiUX(options);
pichai.initialize();
console.log(pichai.getListOfElements());

let i, contrastButton;

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

let contrastBg = document.getElementById('bgColor');
let contrastText = document.getElementById('contrastChecking');

let quoteRefresh = document.getElementById('refresh');
let scoreCheck = document.getElementById('scoreCheck');
let inversedMode = document.getElementById('inversed');
let flip = document.getElementById('flip');

let mainContrastColor = document.getElementById('mc');
let textColor = document.getElementById('tc');

let autoContrast = document.getElementById('autoC');

let similarColorHolder = document.getElementById('similarColorHolder');

function getColorAssociation(name) {
    let className = colorClass.innerHTML;
    let association = '';

    for (i of colorAssociations[className]) {
        association = association + (`<li>${i}</li>`);
    }

    return `${name} is a ${className}-ish color that is often associated with: <br> <ul>${association}</ul>`

}

async function setInnerHTMLs(code) { // updates all elements to match the selected color or show it's info
    let n_match, RGB, CMYK;

    localforage.setItem('lastColor', code).then(function (value) { }).catch(function (err) { });

    //result.sRGBHex to get hex code
    n_match = ntc.name(code);

    RGB = hexToRgb(n_match[0]);
    RGB = RGB.substring(4, RGB.length - 1).split(',');

    CMYK = rgbToCmyk(RGB[0], RGB[1], RGB[2]);

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
    for (i of await getSimilarColors(code)) {
        addTile(similarColorHolder, i);
    }

    contrastBg.style.backgroundColor = code;
    mainContrastColor.value = code;
    mainContrastColor.style.backgroundColor = code;
    randomQoute();
    updateContrast();

    pichai.optimizeTextColor(similarColorHolder);
    pichai.optimizeTextColor(name);
}

async function setColorClass(r, g, b) {
    colorClass.innerHTML = await findColorClass(r, g, b);
    colorClass.style.backgroundColor = await findColorClass(r, g, b);
    colorClass.style.color = await getTextColor(r, g, b);

    associated.innerHTML = await getColorAssociation(name.innerHTML);
}

function randomQoute() { // gives the contrast checker a random qoute.
    fetch('https://quotes-api-self.vercel.app/quote')
        .then(response => response.json())
        .then(data => {
            // Handle the retrieved quote
            contrastText.innerHTML = '<b>' + data.quote + '</b> ~ ' + data.author + ' ~ ';
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

}

localforage.getItem('lastColor').then(function (value) {
    colorPicker.setAttribute('value', value ?? '#008dcd');
}); //set value back to the one set 

//change colors when user chages input value

hex.onchange = function () {
    setInnerHTMLs(hex.value);
    colorPicker.setAttribute('value', hex.value);
}

rgb.onchange = function () {
    setInnerHTMLs(rgbToHex(rgb.value));
    colorPicker.setAttribute('value', rgbToHex(rgb.value));
}

hsl.onchange = function () {
    setInnerHTMLs(hslToHex(hsl.value));
    colorPicker.setAttribute('value', hslToHex(hsl.value));
}

cmyk.onchange = function () {
    setInnerHTMLs(cmykToHex(cmyk.value));
    colorPicker.setAttribute('value', cmykToHex(cmyk.value));
}

colorPicker.addEventListener('change', function () {
    setInnerHTMLs(colorPicker.getAttribute('value'));
});

quoteRefresh.addEventListener('click', function () {
    randomQoute();
});

inversedMode.addEventListener('change', function () {
    if (inversedMode.checked) {
        contrastBg.style.filter = 'invert(100%)';
    } else {
        contrastBg.style.filter = 'invert(0%)';
    }
});

mainContrastColor.addEventListener('click', function () {
    colorPicker.showAsDialog();
    contrastButton = this;
});

textColor.addEventListener('click', function () {
    colorPicker.showAsDialog();
    contrastButton = this;
});

flip.addEventListener('change', function () {
    let textColor = contrastText.style.color;

    contrastText.style.color = contrastBg.style.backgroundColor;
    contrastText.firstChild.style.color = contrastBg.style.backgroundColor;
    contrastBg.style.backgroundColor = textColor;

});

colorPicker.addEventListener('submit', function () {
    let color = JSON.parse(colorPicker.getAttribute('formData')).colorpickervalue;

    contrastButton.value = color;
    contrastButton.style.backgroundColor = color;
    pichai.optimizeTextColor(document.getElementsByClassName('accordionItems')[0]);

    if (contrastButton.id == 'tc') {
        quoteRefresh.style.color = color;
        scoreCheck.style.color = color;
        contrastText.style.color = color;
        contrastText.firstChild.style.color = color;
    } else {
        contrastBg.style.backgroundColor = color;
    }

    checkAccesibillity(contrastBg.style.backgroundColor, contrastText.style.color);
    updateContrast();
});

function updateContrast() {
    if (autoContrast.checked) {
        pichai.optimizeTextColor(contrastBg);

        textColor.style.backgroundColor = contrastText.style.color;
        textColor.value = contrastText.style.color;

        mainContrastColor.style.backgroundColor = contrastBg.style.backgroundColor;
        mainContrastColor.value = contrastBg.style.backgroundColor;

        pichai.optimizeTextColor(document.getElementsByClassName('accordionItems')[0]);

    }
}

autoContrast.addEventListener('change', function () {
    updateContrast();
});

function checkAccesibillity(color, textColor) {
    let color1rgb = color.substring(4, color.length - 1).split(',');

    let color2rgb = textColor.substring(4, textColor.length - 1).split(',');

    const color1luminance = luminance(color1rgb[0], color1rgb[1], color1rgb[2]);
    const color2luminance = luminance(color2rgb[0], color2rgb[1], color2rgb[2]);

    const ratio = color1luminance > color2luminance
        ? ((color2luminance + 0.05) / (color1luminance + 0.05))
        : ((color1luminance + 0.05) / (color2luminance + 0.05));

    scoreCheck.title = `
                AA-level large text: ${ratio < 1 / 3 ? 'PASS' : 'FAIL'}
                AA-level small text: ${ratio < 1 / 4.5 ? 'PASS' : 'FAIL'}
                AAA-level large text: ${ratio < 1 / 4.5 ? 'PASS' : 'FAIL'}
                AAA-level small text: ${ratio < 1 / 7 ? 'PASS' : 'FAIL'}
               `;

    if (ratio < 1 / 3) {
        scoreCheck.innerHTML = 'cancel';
    } else if (ratio < 1 / 4.5) {
        scoreCheck.innerHTML = 'adjust';
    } else if (ratio < 1 / 7) {
        scoreCheck.innerHTML = 'check_circle';
    }
}