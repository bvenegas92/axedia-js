(function(global){

    // Number namespace
    var $Number = {
        constrain: function(number, min, max) {
            var x = parseFloat(number);
            if (min === null) {
                min = number;
            }
            if (max === null) {
                max = number;
            }
            return (x < min) ? min : ((x > max) ? max : x);
        },
        randomInt: function(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        },
    };


    // RegExp namespace
    var $RegExp = {
        BASIC_TRIM: /^\s+|\s+$/g,
        WHITE_SPACE: /\s+/
    };


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


    // Axedia namespace
    var axedia = {
        Number: $Number,
        String: $String,
        RegExp: $RegExp
    };

    window.axedia = window.axd = axedia;

})(window);
