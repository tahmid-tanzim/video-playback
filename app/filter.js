videoApp.filter('time', function() {
    return function(seconds) {
        var hh = Math.floor(seconds / 3600);
        var mm = Math.floor(seconds / 60) % 60;
        var ss = Math.floor(seconds) % 60;
        return hh + ':' + (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss;
    };
});