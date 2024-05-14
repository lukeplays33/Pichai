if (localStorage.getItem('allowedColors') == null || localStorage.getItem('allowedColors') == '') {
    localStorage.setItem('allowedColors', ['#866f85', '#C8102E', '#9500FF', '#5F76A8', '#FF10F0', ' #EBB6CB', '#9400D3', '#FADADD', '#B598A3', '#000000',
        '#E4C798', '#367588', '#00a4b4', '#A0D6B4', '#003153', '#ADD8E6', '#312C6A', '#429e9d', '#ACD5F3', '#0981D1', '#0047AB', '#87CEFA', '#989EB0', '#D9D9D6', '#6699CC', '#00FF7F', '#00334F',
        '#08FF08', '#8DB600', '#FFDF00', '#FF9C00', '#98FB98', '#FFFF00', '#B5EAAA', '#FFA500', '#EAA221',
        '#6D712E', '#013220', '#F6E4C5', '#154734', '#507D2A', '#A0A0A0', '#4DA403', '#40826D',
        '#F29E8E', '#FF00FF', '#FFFFFF', '#C8C9C7', '#DE5D83', '#FFA500',
        '#AB4E52', '#675B58', '#853435', '#7C0D0E', '#AB4B52', '#850101'
    ].join(','));
    localStorage.setItem('palleteLength', 10);
}