import { PichaiUX } from 'https://lukeplays33.github.io/Pichai-UX/imports.js';

let pichai = new PichaiUX();
pichai.initialize();

//update favIcon to match themed one.
const faviconLink = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");

// Get the favicon URL
const faviconUrl = faviconLink ? faviconLink.href : null;

pichai.generateDynamicIcon(faviconUrl).then(function (icon) {
    var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = icon;
});