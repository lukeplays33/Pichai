let lengthInput = document.getElementById('length');

lengthInput.value = window.localStorage.getItem('palelteLength'); //set value back to the one set by the user

lengthInput.onchange = function () {
    window.localStorage.setItem('palleteLength', this.value); // save the users selected pallete size
}