'use strict'

function hyphenSeparatedRoomId(id) {
    return String(id).replace(/(\d)(?=(\d{4})+$)/g, '$1-');
}

if (typeof(exports) !== 'undefined') {
    exports.hyphenSeparatedRoomId = hyphenSeparatedRoomId;
}
