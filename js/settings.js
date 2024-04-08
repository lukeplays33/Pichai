import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

let pichai = new PichaiUX();
pichai.initialize();

let lengthInput = document.getElementById('length');
alert(window.localStorage.getItem('palleteLength'))
lengthInput.value = window.localStorage.getItem('palleteLength') == '' ? 10 : window.localStorage.getItem('palleteLength'); //set value back to the one set by the user

lengthInput.onchange = function () {
    window.localStorage.setItem('palleteLength', this.value); // save the users selected pallete size
}