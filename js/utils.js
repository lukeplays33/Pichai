let value1, value2;

function addTile (element, value) {
    let art = document.createElement('article');
    art.style.backgroundColor = value;
    art.classList.add('.smallTile');

    let text = document.createElement('p');
    text.innerHTML = value;
    text.style.margin = '8px';

    art.appendChild(text);

    element.appendChild(art)
}

async function getSimilarColors (color) {
    return new Promise(async (resolve) => {
    const closestColors = (targetColor, colorArray, count) => {
        const sortedColors = colorArray
            .map((color) => ({
                color,
                distance: calculateDistance(targetColor, color),
            }))
            .sort((a, b) => a.distance - b.distance);
    
        return sortedColors.slice(0, count).map((entry) => entry.color);
    };
    
    const calculateDistance = (color1, color2) => {
        const [r1, g1, b1] = hexToRGB(color1);
        const [r2, g2, b2] = hexToRGB(color2);
        return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
    };
    
    const hexToRGB = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    };

    value1 = await localforage.getItem('allowedColors');
    value2 = await localforage.getItem('palleteLength');

    resolve(closestColors(color, value1.split(','), value2))
});
}

function colourBlend(c1, c2, ratio) {
    ratio = Math.max(Math.min(Number(ratio), 1), 0);
    var r1 = parseInt(c1.substring(1, 3), 16);
    var g1 = parseInt(c1.substring(3, 5), 16);
    var b1 = parseInt(c1.substring(5, 7), 16);
    var r2 = parseInt(c2.substring(1, 3), 16);
    var g2 = parseInt(c2.substring(3, 5), 16);
    var b2 = parseInt(c2.substring(5, 7), 16);
    var r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    var g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    var b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    r = ('0' + (r || 0).toString(16)).slice(-2);
    g = ('0' + (g || 0).toString(16)).slice(-2);
    b = ('0' + (b || 0).toString(16)).slice(-2);
    return '#' + r + g + b;
  }

export { getSimilarColors,addTile, colourBlend }