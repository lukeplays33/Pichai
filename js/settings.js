import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

let pichai = new PichaiUX();
pichai.initialize();

let lengthInput = document.getElementById('length');
let allowedColors = document.getElementById('allowedColors');
let allowedColorsList = document.getElementById('allowedColorsDialog');
let add = document.getElementById('add');

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

add.onclick = function () {
    let color = prompt('Enter a hex code to add');

    if(color == '' || color == null) {
        return;
    }

    addAllowedColor(color);
}

function addAllowedColor (color) {
    let holder = add.cloneNode(true);
    holder.children[1].value = '-';
    holder.children[1].id = `remove${color}`;
    holder.children[0].innerHTML = color;
}