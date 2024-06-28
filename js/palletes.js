import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

let viewPager = document.getElementById('palletePager');
let docs = document.getElementById('docs');
let preview = document.getElementById('preview');

let pichai = new PichaiUX();
pichai.initialize();

function getTypeFromUrl(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }

 if(getTypeFromUrl('type') == "'ux'") {
    viewPager.setAttribute('pageindex', '1');
 }

 viewPager.addEventListener('pageChange', function (e) {
    if(e.pageIndex == 1) {
      docs.style.display = 'none';
      preview.style.display = 'none';
    } else {
      docs.style.display = 'block';
      preview.style.display = 'block';
    }
 });