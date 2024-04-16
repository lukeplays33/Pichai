function addTile (element, value) {
    let art = document.createElement('article');
    art.style.backgroundColor = value;
    art.classList.add('.smallTile');

    let text = document.createElement('p');
    text.innerHTML = value;

    art.appendChild(text);

    element.appendChild(art)
}

function getSimilarColors (color) {
    console.log('test')
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

    return closestColors(color, window.localStorage.getItem('allowedColors').split(','), window.localStorage.getItem('palleteLength'));
}

export { getSimilarColors,addTile }