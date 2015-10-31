define([
    './number',
    './string',
    './regexp'
], function($Number, $String, $RegExp) {
    // Axedia namespace
    var axedia = {
        Number: $Number,
        String: $String,
        RegExp: $RegExp
    };

    window.axedia = window.axd = axedia;
});
