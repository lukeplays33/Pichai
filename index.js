import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

document.body.onload = function () {
    alert(document.body.style.backgroundImage)
    let image = String(document.body.style.backgroundImage);
    image = image.substring(3, image.length - 1);

    let options = {
        source: image || '#008dcd',
        darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        overrideColorsOnScroll: true
    }

    let pichai = new PichaiUX(options);
    pichai.initialize();
}