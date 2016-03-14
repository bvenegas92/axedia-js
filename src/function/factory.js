define([
    './function',
    '../var/array/slice'
], function($Function, arraySlice) {
    $Function.factory = function() {
        var args = arraySlice.call(arguments),
            ln;

        return Function.prototype.constructor.apply(Function.prototype, args);
    };
});
