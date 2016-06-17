formatTime = function(time) {
    var result = false, match;

    var hourRegExp = /^\s*([01]?\d|2[0-3])(:|h|H)?([0-5]\d)\s*$/;

    if ( (match = time.match(hourRegExp)) ) {
        result = _.padStart(match[1], 2, '0') + "h" + match[3];
    }

    return result;
}
