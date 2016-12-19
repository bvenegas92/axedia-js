define([
    "./String"
], function(String) {
/**
 * Constante de intervalo
 *
 * @type {String}
 */
Date.MILLIS = "ms";

/**
 * Constante de intervalo
 *
 * @type {String}
 */
Date.SECOND = "s";

/**
 * Constante de intervalo
 *
 * @type {String}
 */
Date.MINUTE = "mi";

/**
 * Constante de intervalo
 *
 * @type {String}
 */
Date.HOUR = "h";

/**
 * Constante de intervalo
 *
 * @type {String}
 */
Date.DAY = "d";

/**
 * Constante de intervalo
 *
 * @type {String}
 */
Date.MONTH = "mo";

/**
 * Constante de intervalo
 *
 * @type {String}
 */
Date.YEAR = "y";

/**
 * Dias de las semana
 *
 * @type {Array}
 */
Date.dayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado"
];

/**
 * Dias de las semana
 *
 * @type {Array}
 */
Date.monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

/**
 * Numero de los meses
 *
 * @type {Object}
 */
Date.monthNumbers = {
    Enero: 0,
    Ene: 0,
    Febrero: 1,
    Feb: 1,
    Marzo: 2,
    Mar: 2,
    Abril: 3,
    Abr: 3,
    Mayo: 4,
    Junio: 5,
    Jun: 5,
    Julio: 6,
    Jul: 6,
    Agosto: 7,
    Ago: 7,
    Septiembre: 8,
    Sep: 8,
    Octubre: 9,
    Oct: 9,
    Noviembre: 10,
    Nov: 10,
    Diciembre: 11,
    Dec: 11
};

/**
 * Crea y retorna una nueva instancia `Date` con el mismo valor de `date`.
 * Las instancias `Date` son pasadas por referencia esto implica que al copiar una fecha en otra variable
 * ambas variables tanto la vieja como la nueva apuntaran a la misma instancia. Si se pretende que ambas variables
 * tengan diferentes instancias entonces se debe clonar la instancia.
 *
 * @param {Date} date
 * @return {Date} Nueva instancia `Date` con la fecha proporcionada
 */
Date.clone = function(date) {
    return new Date(date.getTime());
};

/**
 * Verifica si la fecha proporcionada entra en un año bisiesto.
 *
 * @param {Date} date
 * @return {Boolean}
 */
Date.isLeapYear = function(date) {
    var year = date.getFullYear();

    return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
};

/**
 * Retorna el numero de dias en el mes de la fecha proporcionada. Ajustado para años bisiestos.
 *
 * @param {Date} date
 * @return {Number}
 */
Date.getDaysInMonth = function(date) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        m = date.getMonth();

    return m === 1 && Date.isLeapYear(date) ? 29 : daysInMonth[m];
};

/**
 * Retorna la fecha del ultimo dia del mes en que la fecha proporcionada reside.
 *
 * @param {Date} date
 * @return {Date}
 */
Date.getLastDateOfMonth = function(date) {
    return new Date(date.getFullYear(), date.getMonth(), Date.getDaysInMonth(date));
};

/**
 * Retorna la fecha del primer dia del mes en que la fecha proporcionada reside.
 *
 * @param {Date} date
 * @return {Date}
 */
Date.getFirstDateOfMonth = function(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Provee una forma conveniente para realizar operaciones aritmeticas con fechas. Este metodo no modifica
 * la instancia `Date` proporcionada, crea y retorna una nueva instancia de `Date` con el resultado.
 *
 * @param {Date} date
 * @param {String} interval Intervalo para la operacion
 * @param {Number} value Valor a agregar/restar a la fecha
 * @return {Date} Nueva instancia `Date` con el resultado
 */
Date.add = function(date, interval, value) {
    var d = Date.clone(date),
        base = 0,
        day, decimalValue;

    if (!interval || value === 0) {
        return d;
    }

    decimalValue = value - parseInt(value, 10);
    value = parseInt(value, 10);

    if (value) {
        switch (interval.toLowerCase()) {
            // See EXTJSIV-7418. We use setTime() here to deal with issues related to
            // the switchover that occurs when changing to daylight savings and vice
            // versa. setTime() handles this correctly where setHour/Minute/Second/Millisecond
            // do not. Let"s assume the DST change occurs at 2am and we"re incrementing using add
            // for 15 minutes at time. When entering DST, we should see:
            // 01:30am
            // 01:45am
            // 03:00am // skip 2am because the hour does not exist
            // ...
            // Similarly, leaving DST, we should see:
            // 01:30am
            // 01:45am
            // 01:00am // repeat 1am because that"s the change over
            // 01:30am
            // 01:45am
            // 02:00am
            // ....
            //
            case Date.MILLI:
                d.setTime(d.getTime() + value);
                break;
            case Date.SECOND:
                d.setTime(d.getTime() + value * 1000);
                break;
            case Date.MINUTE:
                d.setTime(d.getTime() + value * 60 * 1000);
                break;
            case Date.HOUR:
                d.setTime(d.getTime() + value * 60 * 60 * 1000);
                break;
            case Date.DAY:
                d.setDate(d.getDate() + value);
                break;
            case Date.MONTH:
                day = date.getDate();
                if (day > 28) {
                    day = Math.min(
                        day,
                        Date.getLastDateOfMonth(
                            Date.add(Date.getFirstDateOfMonth(date),
                            Date.MONTH,
                            value
                        )
                        ).getDate()
                    );
                }
                d.setDate(day);
                d.setMonth(date.getMonth() + value);
                break;
            case Date.YEAR:
                day = date.getDate();
                if (day > 28) {
                    day = Math.min(
                        day,
                        Date.getLastDateOfMonth(Date.add(
                            Date.getFirstDateOfMonth(date),
                            Date.YEAR,
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
            case Date.MILLI:    base = 1;               break;
            case Date.SECOND:   base = 1000;            break;
            case Date.MINUTE:   base = 1000 * 60;         break;
            case Date.HOUR:     base = 1000 * 60 * 60;      break;
            case Date.DAY:      base = 1000 * 60 * 60 * 24;   break;

            case Date.MONTH:
                day = Date.getDaysInMonth(d);
                base = 1000 * 60 * 60 * 24 * day;
                break;

            case Date.YEAR:
                day = (Date.isLeapYear(d) ? 366 : 365);
                base = 1000 * 60 * 60 * 24 * day;
                break;
        }
        if (base) {
            d.setTime(d.getTime() + base * decimalValue);
        }
    }

    return d;
};

/**
 * Verifica si la fecha `date` esta entre las fechas `start` y `end`
 *
 * @param {Date} date
 * @param {Date} start Fecha inicial
 * @param {Date} end Fecha final
 * @return {Boolean}
 */
Date.isBetween = function(date, start, end) {
    var t = date.getTime();

    return start.getTime() <= t && t <= end.getTime();
};

/**
 * Intenta limpiar la informacion del tiempo de la instancia `date` estableciendola a la medianoche.
 * Modifica la instancia proporcionada.
 *
 * @param {Date} date
 * @return {Date}
 */
Date.clearTime = function(date) {
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
        for (hr = 1, c = Date.add(date, Date.HOUR, hr);
            c.getDate() !== d;
            hr++, c = Date.add(date, Date.HOUR, hr)
        ) {}

        date.setDate(d);
        date.setHours(c.getHours());
    }

    return date;
};

/**
 * Calcula cuantas unidades de `unit` hay entre `min` y `max`.
 * La cantidad es entera de manera que si sobra alguna unidad menor de tiempo
 * esta no sera tomada en cuenta. Ejemplo:
 *
 * date1 = "2016-01-01 00:00:00"
 * date2 = "2016-01-03 10:05:30"
 *
 * Date.diff(date1, date2, Date.DAY) == 2  <-- la diferencia es de 2 dias aun si
 *                                             hay 10 hrs 5 min y 30 seg sobrando
 *
 * @param {Date} min Fecha inicial
 * @param {Date} max Fecha final
 * @param {String}  unit Tipo de unidad (e.g. Date.DAY, Date.MONTH, Date.YEAR)
 * @return {Number}
 */
Date.diff = function(min, max, unit) {
    var est, diff = +max - min;

    switch (unit) {
        case Date.MILLI:
            return diff;
        case Date.SECOND:
            return Math.floor(diff / 1000);
        case Date.MINUTE:
            return Math.floor(diff / 60000);
        case Date.HOUR:
            return Math.floor(diff / 3600000);
        case Date.DAY:
            return Math.floor(diff / 86400000);
        case "w":
            return Math.floor(diff / 604800000);
        case Date.MONTH:
            est = (max.getFullYear() * 12 + max.getMonth()) - (min.getFullYear() * 12 + min.getMonth());
            if (Date.add(min, unit, est) > max) {
                return est - 1;
            }
            return est;
        case Date.YEAR:
            est = max.getFullYear() - min.getFullYear();
            if (Date.add(min, unit, est) > max) {
                return est - 1;
            } else {
                return est;
            }
    }
};

/**
 * Obtiene el nombre corto del dia del numero de dia proporcionado.
 *
 * @param {Number} day Numero del dia
 * @return {String} Nombre corto del dia
 */
Date.getShortDayName = function(day) {
    return Date.dayNames[day].substring(0, 3);
};

/**
 * Obtiene el numero del dia (base 0) del año.
 *
 * @param {Date} date
 * @return {Number}
 */
Date.getDayOfYear = function(date) {
    var num = 0,
        d = Date.clone(date),
        m = date.getMonth(),
        i;

    for (i = 0, d.setDate(1), d.setMonth(0); i < m; d.setMonth(++i)) {
        num += Date.getDaysInMonth(d);
    }
    return num + date.getDate() - 1;
};

/**
 * Obtiene el numero de semana del año de la fecha.
 *
 * @param {Date} date
 * @return {Number}
 */
Date.getWeekOfYear = function(date) {
    // adapted from http://www.merlyn.demon.co.uk/weekcalc.htm
    var ms1d = 864e5, // milliseconds in a day
        ms7d = 7 * ms1d, // milliseconds in a week
        DC3 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 3) / ms1d, // an Absolute Day Num
        AWN = Math.floor(DC3 / 7), // an Absolute Week Number
        Wyr = new Date(AWN * ms7d).getUTCFullYear();

    return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
};

/**
 * Obtiene el nombre corto del mes del numero de mes proporcionado.
 *
 * @param {Number} month
 * @return {String}
 */
Date.getShortMonthName = function(month) {
    return Date.monthNames[month].substring(0, 3);
};

/**
 * Obtiene la compensacion por la zona horaria.
 *
 * @param {Date} date
 * @param {Boolean} colon `true` para separar con ":" las horas y minutos
 * @return {String}
 */
Date.getGMTOffset = function(date, colon) {
    var offset = date.getTimezoneOffset();

    return (offset > 0 ? "-" : "+") +
        String.leftPad(Math.floor(Math.abs(offset) / 60), 2, "0") +
        (colon ? ":" : "") +
        String.leftPad(Math.abs(offset % 60), 2, "0");
};

/**
 * Obtiene la abreviacion de la zona horaria de `date`
 *
 * @param {Date} date
 * @return {String}
 */
Date.getTimezone = function(date) {
    // <ExtJS>
    // the following list shows the differences between date strings from different browsers on a WinXP SP2
    // machine from an Asian locale:
    //
    // Opera  : "Thu, 25 Oct 2007 22:53:45 GMT+0800" -- shortest (weirdest) date string of the lot
    // Safari : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always
    // gives the correct timezone (same as FF)
    // FF     : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always
    // gives the correct timezone
    // IE     : "Thu Oct 25 22:54:35 UTC+0800 2007" -- (Asian system setting) look for 3-4 letter timezone abbrev
    // IE     : "Thu Oct 25 17:06:37 PDT 2007" -- (American system setting) look for 3-4 letter timezone abbrev
    //
    // this crazy regex attempts to guess the correct timezone abbreviation despite these differences.
    // step 1: (?:\((.*)\) -- find timezone in parentheses
    // step 2: ([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?) -- if nothing was found in step 1, find timezone from
    // timezone offset portion of date string
    // step 3: remove all non uppercase characters found in step 1 and 2
    return date.toString()
        .replace(/^.* (?:\((.*)\)|([A-Z]{1,5})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2")
        .replace(/[^A-Z]/g, "");
};

/**
 * Retorna el numero de milisegundos entre dos fechas
 *
 * @param {Date} dateA Fecha A
 * @param {Date} [dateB] Fecha B
 * @return {Number} Diferencia en milisegundos
 */
Date.getElapsed = function(dateA, dateB) {
    return Math.abs(dateA - (dateB || Date.now()));
};

/**
 * Obtiene el numero de dia de la semana (base 0) del primer dia del mes.
 *
 * @param {Date} date
 * @return {Number}
 */
Date.getFirstDayOfMonth = function(date) {
    var day = (date.getDay() - (date.getDate() - 1)) % 7;

    return (day < 0) ? (day + 7) : day;
};

/**
 * Obtiene el ultimo dia del mes de `date`. El valor retornado es un indice del dia de la semana (0-6)
 *
 * @param  {Date} date
 * @return {Number} El numero del dia (0-6)
 */
Date.getLastDayOfMonth  = function(date) {
    return Date.getLastDateOfMonth(date).getDay();
};

/**
 * Obtiene el numero del mes (JavaScript base 0) del nombre/abreviacion del mes proporcionado.
 *
 * @param {String} name Nombre/abreviacion del mes
 * @return {Number} Numero del mes
 */
Date.getMonthNumber = function(name) {
    return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};

/**
 * Verifica si la fecha actual esta afectada por el horario de verano (DST)
 *
 * @param {Date} date
 * @return {Boolean}
 */
Date.isDST = function(date) {
    return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() !== date.getTimezoneOffset();
};

/**
 * Verifica si dos instancias `Date` son identicas comparando sus valores
 *
 * @param {Date} date1
 * @param {Date} date2
 * @return {Boolean}
 */
Date.isEqual = function(date1, date2) {
    // check we have 2 date objects
    if (date1 && date2) {
        return (date1.getTime() === date2.getTime());
    }
    // one or both isn't a date, only equal if both are falsey
    return !(date1 || date2);
};

/**
 * Verifica si los parametros para crear una instancia `date causarian un "rollover".
 *
 * @param {Number} y Año
 * @param {Number} m Mes
 * @param {Number} d Dia
 * @param {Number} h Horas
 * @param {Number} i Minutos
 * @param {Number} s Segundos
 * @param {Number} ms Milisegundos
 * @return {Boolean}
 */
Date.isValid = function(y, m, d, h, i, s, ms) {
    // setup defaults
    h = h || 0;
    i = i || 0;
    s = s || 0;
    ms = ms || 0;

    // Special handling for year < 100
    var dt = Date.add(new Date(y < 100 ? 100 : y, m - 1, d, h, i, s, ms), Date.YEAR, y < 100 ? y - 100 : 0);

    return y === dt.getFullYear() &&
        m === dt.getMonth() + 1 &&
        d === dt.getDate() &&
        h === dt.getHours() &&
        i === dt.getMinutes() &&
        s === dt.getSeconds() &&
        ms === dt.getMilliseconds();
};

/**
 * Provee una forma conveniente para realizar operaciones aritmeticas con fechas.
 * Este metodo no modifica la instancia `Date` proporcionada
 * crea y retorna una nueva instancia de `Date` con el resultado.
 *
 * @param {Date} date La fecha a modificar
 * @param {String} interval Intervalo para la operacion
 * @param {Number} value Valor a agregar/restar a la fecha
 * @return {Date} Nueva instancia `Date` con el resultado
 */
Date.subtract = function(date, interval, value) {
    return Date.add(date, interval, -value);
};
});
