define([
    './array',
    './number',
    './regexp',
    './string'
], function($Array, $Number, $RegExp, $String) {
    // Axedia Namespace
    global.Axedia = global.Axd = {
        Array: $Array,
        Number: $Number,
        RegExp: $RegExp,
        String: $String
    };
});
