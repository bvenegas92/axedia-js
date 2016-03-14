define([
    './date',
    './getLastDateOfMonth'
], function($Date) {
    $Date.getLastDayOfMonth  = function(date) {
        return $Date.getLastDateOfMonth(date).getDay();
    };
});
