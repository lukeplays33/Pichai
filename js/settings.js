import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

let pichai = new PichaiUX();
pichai.initialize();

let i;

let lengthInput = document.getElementById('length');
let allowedColors = document.getElementById('allowedColors');
let allowedColorsList = document.getElementById('allowedColorsDialog');
let add = document.getElementById('add');
let creteColor = document.getElementById('create');

let listOfAllowedColors = [];
listOfAllowedColors = window.localStorage.getItem('allowedColors').split(',');

for (i of listOfAllowedColors) {
    addAllowedColor(i);
}

lengthInput.value = window.localStorage.getItem('palleteLength'); //set value back to the one set by the user

lengthInput.onchange = function () {
    window.localStorage.setItem('palleteLength', this.value); // save the users selected pallete size
}

allowedColors.onclick = function () {
    if (this.value == 'V') {
        this.value = 'X';
        allowedColorsList.style.display = 'grid';
    } else {
        this.value = 'V';
        allowedColorsList.style.display = 'none';
    }
}

add.onclick = function () {
    let color = prompt('Enter a hex code to add');

    if (color == '' || color == null) {
        return;
    }

    addAllowedColor(color);
    listOfAllowedColors.push(color);
    window.localStorage.setItem('allowedColors', listOfAllowedColors.join(','));
}

function addAllowedColor(color) {
    let holder = creteColor.cloneNode(true);

    holder.children[1].value = '-';
    holder.children[1].id = `remove${color}`;
    holder.children[1].setAttribute('color', color);
    holder.children[1].onclick = function () {
        this.parentNode.remove();

        listOfAllowedColors.splice(listOfAllowedColors.indexOf(this.getAttribute('color')), 1);
        window.localStorage.setItem('allowedColors', listOfAllowedColors.join(','));
        console.log(listOfAllowedColors)
    }

    holder.children[0].innerHTML = color;

    holder.style.backgroundColor = color;

    allowedColorsList.appendChild(holder);

    pichai.optimizeTextColor(allowedColorsList);
}