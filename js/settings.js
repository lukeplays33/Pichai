import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

let pichai = new PichaiUX();
pichai.initialize();

let lengthInput = document.getElementById('length');
let allowedColors = document.getElementById('allowedColors');
let allowedColorsList = document.getElementById('allowedColorsDialog');

lengthInput.value = window.localStorage.getItem('palleteLength') == null ? 10 : window.localStorage.getItem('palleteLength'); //set value back to the one set by the user

lengthInput.onchange = function () {
    window.localStorage.setItem('palleteLength', this.value); // save the users selected pallete size
}

allowedColors.onclick = function () {
    if(this.value == 'V') {
        this.value = 'X';
        allowedColorsList.style.display = 'grid';
    } else {
        this.value = 'V';
        allowedColorsList.style.display = 'none';
    }
}