import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

let pichai = new PichaiUX();
pichai.initialize();

function getTypeFromUrl(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }

 console.log(getTypeFromUrl('ux'))
 if(getTypeFromUrl('ux') == 'ux') {
    document.getElementById('palletePager').setAttribute('pageindex', '1');
 }