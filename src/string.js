define([
    './number',
    './regexp'
], function($Number, $RegExp) {
    // String namespace
    var $String = {
        splitWords: function(words) {
            if (words && typeof words === 'string') {
                return words
                    .replace($RegExp.BASIC_TRIM, '')
                    .split($RegExp.WHITE_SPACE);
            }
            return words || [];
        },
        random: function(length) {
            length = length || $Number.randomInt(1,32);
            return 'AAAA';
        }
    };
});
