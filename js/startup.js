if (window.localStorage.getItem('allowedColors') == null || window.localStorage.getItem('allowedColors') == '') {
    window.localStorage.setItem('allowedColors', ['#FD0100', '#0100FC', '#009901', '#F89909', '#FEFD00', '#FFCAD2', '#980086', '#FD83F2', '#00DECF', '#FCD800', '#07FB00', '#05FBFF', '#010084', '#FF7D4C', '#008083', '#C02428', '#FDFDFD', '#020000', '#A39D97'].join(','));
    window.localStorage.setItem('palleteLength', 10);
}