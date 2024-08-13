import '../js/ai/Brain.js';
import ColorThief from '../js/ai/colorThief.js';

import { RGBToHSL } from '../js/colorUtils.js';

let upload = document.getElementById('upload');
let trainingData = document.getElementById('trainingData');

let data = {}

upload.addEventListener('change', function () {
    let file = upload.files[0];

    const reader = new FileReader();
    reader.onload = async (e) => { // read the file and turns into into a readable image stream
        let lighting = await getLighting(e.target.result);
        trainingData.innerHTML = JSON.stringify(data);
    };
    reader.readAsDataURL(file);
});

function getLighting (file) {
    let i;

    return new Promise((resolve) => {
            const colorThief = new ColorThief();
            const img = new Image();

            img.addEventListener('load', () => {
                let colors = colorThief.getPalette(img);
                let lighting;

                for(i of colors) {
                    lighting = RGBToHSL(i[0], i[1], i[2]).split(',')[2];
                }
                resolve(lighting);
            });

            img.crossOrigin = 'Anonymous';
            img.src = file;
    });
}