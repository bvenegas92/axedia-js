define([
    './date',
    '../var/math/abs'
], function($Date, mathAbs) {
    $Date.getElapsed = function(dateA, dateB) {
        return mathAbs(dateA - (dateB || Date.now()));
    };
});
