define([
    './date',
    './milli',
    './second',
    './minute',
    './hour',
    './day',
    './month',
    './year',
    './clone',
    '../var/math/min',
    './getLastDateOfMonth',
    './getFirstDateOfMonth',
    './getDaysInMonth',
    './isLeapYear'
], function($Date, mathMin) {
    /**
     * Provee una forma conveniente para realizar operaciones aritmeticas con fechas. Este metodo no modifica
     * la instancia `Date` proporcionada, crea y retorna una nueva instancia de `Date` con el resultado.
     *
     * @param {Date}    date      La fecha a modificar
     * @param {String}  interval  Intervalo para la operacion
     * @param {Number}  value     Valor a agregar/restar a la fecha
     * @return {Date}             Nueva instancia `Date` con el resultado
     */
    $Date.add = function(date, interval, value) {
        var d = $Date.clone(date),
            day, decimalValue, base = 0;
        if (!interval || value === 0) {
            return d;
        }

        decimalValue = value - parseInt(value, 10);
        value = parseInt(value, 10);

        if (value) {
            switch (interval.toLowerCase()) {
                // <ExtJS>
                // See EXTJSIV-7418. We use setTime() here to deal with issues related to
                // the switchover that occurs when changing to daylight savings and vice
                // versa. setTime() handles this correctly where setHour/Minute/Second/Millisecond
                // do not. Let's assume the DST change occurs at 2am and we're incrementing using add
                // for 15 minutes at time. When entering DST, we should see:
                // 01:30am
                // 01:45am
                // 03:00am // skip 2am because the hour does not exist
                // ...
                // Similarly, leaving DST, we should see:
                // 01:30am
                // 01:45am
                // 01:00am // repeat 1am because that's the change over
                // 01:30am
                // 01:45am
                // 02:00am
                // ....
                //
                case $Date.MILLI:
                    d.setTime(d.getTime() + value);
                    break;
                case $Date.SECOND:
                    d.setTime(d.getTime() + value * 1000);
                    break;
                case $Date.MINUTE:
                    d.setTime(d.getTime() + value * 60 * 1000);
                    break;
                case $Date.HOUR:
                    d.setTime(d.getTime() + value * 60 * 60 * 1000);
                    break;
                case $Date.DAY:
                    d.setDate(d.getDate() + value);
                    break;
                case $Date.MONTH:
                    day = date.getDate();
                    if (day > 28) {
                        day = mathMin(
                            day,
                            $Date.getLastDateOfMonth(
                                $Date.add($Date.getFirstDateOfMonth(date),
                                $Date.MONTH,
                                value
                            )
                            ).getDate()
                        );
                    }
                    d.setDate(day);
                    d.setMonth(date.getMonth() + value);
                    break;
                case $Date.YEAR:
                    day = date.getDate();
                    if (day > 28) {
                        day = mathMin(
                            day,
                            $Date.getLastDateOfMonth($Date.add(
                                $Date.getFirstDateOfMonth(date),
                                $Date.YEAR,
                                value
                            )).getDate()
                        );
                    }
                    d.setDate(day);
                    d.setFullYear(date.getFullYear() + value);
                    break;
            }
        }

        if (decimalValue) {
            switch (interval.toLowerCase()) {
                case $Date.MILLI:    base = 1;               break;
                case $Date.SECOND:   base = 1000;            break;
                case $Date.MINUTE:   base = 1000 * 60;         break;
                case $Date.HOUR:     base = 1000 * 60 * 60;      break;
                case $Date.DAY:      base = 1000 * 60 * 60 * 24;   break;

                case $Date.MONTH:
                    day = $Date.getDaysInMonth(d);
                    base = 1000 * 60 * 60 * 24 * day;
                    break;

                case $Date.YEAR:
                    day = ($Date.isLeapYear(d) ? 366 : 365);
                    base = 1000 * 60 * 60 * 24 * day;
                    break;
            }
            if (base) {
                d.setTime(d.getTime() + base * decimalValue);
            }
        }

        return d;
    };
});
