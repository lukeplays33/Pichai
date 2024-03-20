import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

alert(document.body.style.backgroundImage)
let image = String(document.body.style.backgroundImage);
image = image.substring(3, image.length - 1);

let options = {
    source: image || '#008dcd',
    darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    overrideColorsOnScroll: true
}

window.onload = function () {
let pichai = new PichaiUX();
pichai.initialize();
}