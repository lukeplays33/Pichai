import { PichaiUX } from 'https://dreamforge-forging-our-dreams-in-tech.github.io/Pichai-UX/imports.js';

let viewPager = document.getElementById('palletePager');
let docs = document.getElementById('docs');
let preview = document.getElementById('preview');

let options = {homeLink: 'https://lukeplays33.github.io/Pichai/index.html'}

let pichai = new PichaiUX(options);
pichai.initialize();

function getTypeFromUrl(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }

 if(getTypeFromUrl('type') == "'ux'") {
    viewPager.setAttribute('pageindex', '1');
 } else {
   docs.style.display = 'none';
   preview.style.display = 'none';
 }

 viewPager.addEventListener('pageChange', function (e) {
    if(e.detail.pageIndex == 0) {
      docs.style.display = 'none';
      preview.style.display = 'none';
    } else {
      docs.style.display = 'flex';
      preview.style.display = 'flex';
    }
 });