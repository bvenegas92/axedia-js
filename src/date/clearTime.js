define([
    "./date",
    "./clone",
    "./add",
    "./hour"
], function() {
    /**
     * Intenta limpiar la informacion del tiempo de la instancia `Date` estableciendola a la medianoche.
     *
     * @param {Date} date Instancia a limpiar
     * @param {Boolean} clone `true` para retornar una nueva instancia
     * @return {Date} `Date` con el tiempo limpio
     */
    $.Date.clearTime = function(date, clone) {
        if (clone) {
            return $.Date.clearTime($.Date.clone(date));
        }

        // get current date before clearing time
        var d = date.getDate(),
            hr,
            c;

        // clear time
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        if (date.getDate() !== d) { // account for DST (i.e. day of month changed when setting hour = 0)
            // note: DST adjustments are assumed to occur in multiples of 1 hour (this is almost always the case)
            // refer to http://www.timeanddate.com/time/aboutdst.html for the (rare) exceptions to this rule

            // increment hour until cloned date == current date
            for (hr = 1, c = $.Date.add(date, $.Date.HOUR, hr);
                c.getDate() !== d;
                hr++, c = $.Date.add(date, $.Date.HOUR, hr)
            ) {}

            date.setDate(d);
            date.setHours(c.getHours());
        }

        return date;
    };
});
