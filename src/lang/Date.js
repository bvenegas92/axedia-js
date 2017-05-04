define([
    "./String",
    "./Object",
    "./Number",
    "./Function"
], function(
    String,
    Object,
    Number,
    Function
) {
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
 * Codigos para los formatos soportados
 *
 *      Format      Description                                                               Example returned values
 *      ------      -----------------------------------------------------------------------   -----------------------
 *        d         Day of the month, 2 digits with leading zeros                             01 to 31
 *        D         A short textual representation of the day of the week                     Mon to Sun
 *        j         Day of the month without leading zeros                                    1 to 31
 *        l         A full textual representation of the day of the week                      Sunday to Saturday
 *        F         A full textual representation of a month, such as January or March        January to December
 *        m         Numeric representation of a month, with leading zeros                     01 to 12
 *        M         A short textual representation of a month                                 Jan to Dec
 *        n         Numeric representation of a month, without leading zeros                  1 to 12
 *        Y         A full numeric representation of a year, 4 digits                         Examples: 1999 or 2003
 *        y         A two digit representation of a year                                      Examples: 99 or 03
 *        a         Lowercase Ante meridiem and Post meridiem                                 am or pm
 *        A         Uppercase Ante meridiem and Post meridiem                                 AM or PM
 *        g         12-hour format of an hour without leading zeros                           1 to 12
 *        G         24-hour format of an hour without leading zeros                           0 to 23
 *        h         12-hour format of an hour with leading zeros                              01 to 12
 *        H         24-hour format of an hour with leading zeros                              00 to 23
 *        i         Minutes, with leading zeros                                               00 to 59
 *        s         Seconds, with leading zeros                                               00 to 59
 *        u         Decimal fraction of a second                                              Examples:
 *                  (minimum 1 digit, arbitrary number of digits allowed)                     001 (i.e. 0.001s) or
 *                                                                                            100 (i.e. 0.100s) or
 *                                                                                            999 (i.e. 0.999s) or
 *                                                                                            999876543210 (i.e. 0.999876543210s)
 *        U         Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)                1193432466 or -2138434463
 *
 * Example usage (note that you must escape format specifiers with '\\' to render them as character literals):
 *
 *     // Sample date:
 *     // 'Wed Jan 10 2007 15:05:01 GMT-0600 (Central Standard Time)'
 *
 *     var dt = new Date('1/10/2007 03:05:01 PM GMT-0600');
 *     console.log(Date.format(dt, 'Y-m-d'));                          // 2007-01-10
 *     console.log(Date.format(dt, 'F j, Y, g:i a'));                  // January 10, 2007, 3:05 pm
 *     console.log(Date.format(dt, 'l, \\t\\he jS \\of F Y h:i:s A')); // Wednesday, the 10th of January 2007 03:05:01 PM
 */
Date.formatCodes = {
    d: "String.leftPad(m.getDate(), 2, '0')",
    D: "Date.getShortDayName(m.getDay())",
    j: "m.getDate()",
    l: "Date.dayNames[m.getDay()]",
    F: "Date.monthNames[m.getMonth()]",
    m: "String.leftPad(m.getMonth() + 1, 2, '0')",
    M: "Date.getShortMonthName(m.getMonth())",
    n: "(m.getMonth() + 1)",
    Y: "String.leftPad(m.getFullYear(), 4, '0')",
    y: "('' + m.getFullYear()).substring(2, 4)",
    a: "(m.getHours() < 12 ? 'am' : 'pm')",
    A: "(m.getHours() < 12 ? 'AM' : 'PM')",
    g: "((m.getHours() % 12) ? m.getHours() % 12 : 12)",
    G: "m.getHours()",
    h: "String.leftPad((m.getHours() % 12) ? m.getHours() % 12 : 12, 2, '0')",
    H: "String.leftPad(m.getHours(), 2, '0')",
    i: "String.leftPad(m.getMinutes(), 2, '0')",
    s: "String.leftPad(m.getSeconds(), 2, '0')",
    u: "String.leftPad(m.getMilliseconds(), 3, '0')",
    U: "Math.round(m.getTime() / 1000)"
};

/**
 * Un objeto en el cual cada propiedad es una funcion para formatear fechas. El nombre de la
 * propiedad es el formato que corresponde al string de la fecha con dicho formato.
 *
 * Este objeto es automaticamente llenado con las funciones para formatear fechas
 * cuando la funcion `format` es llamada.
 *
 * Una funcion de formato debe retornar un `string` con la representacion de `Date` el cual
 * es el scope (`this`) de la funcion.
 *
 * @type Object
 */
Date.formatFunctions = {};

/**
 * Codigos para los formatos soportados.
 *
 * Notes:
 * g = {Number} calculation group (0 or 1. only group 1 contributes to date calculations.)
 * c = {String} calculation method (required for group 1. null for group 0. {0} = currentGroup - position in regex result array)
 * s = {String} regex pattern. all matches are stored in results[], and are accessible by the calculation mapped to 'c'
 */
Date.parseCodes = {
    d: {
        g: 1,
        c: "d = parseInt(results[{0}], 10);\n",
        s: "(3[0-1]|[1-2][0-9]|0[1-9])" // day of month with leading zeroes (01 - 31)
    },
    D: function() {
        for (var a = [], i = 0; i < 7; a.push(Date.getShortDayName(i)), ++i); // get localised short day names
        return {
            g: 0,
            c: null,
            s: "(?:" + a.join("|") + ")"
        };
    },
    j: {
        g: 1,
        c: "d = parseInt(results[{0}], 10);\n",
        s: "(3[0-1]|[1-2][0-9]|[1-9])" // day of month without leading zeroes (1 - 31)
    },
    l: function() {
        return {
            g: 0,
            c: null,
            s: "(?:" + Date.dayNames.join("|") + ")"
        };
    },
    F: function() {
        return {
            g: 1,
            c: "m = parseInt(me.getMonthNumber(results[{0}]), 10);\n", // get localised month number
            s: "(" + Date.monthNames.join("|") + ")"
        };
    },
    m: {
        g: 1,
        c: "m = parseInt(results[{0}], 10) - 1;\n",
        s: "(1[0-2]|0[1-9])" // month number with leading zeros (01 - 12)
    },
    M: function() {
        for (var a = [], i = 0; i < 12; a.push(Date.getShortMonthName(i)), ++i); // get localised short month names
        return Object.copyIf({
            s: "(" + a.join("|") + ")"
        }, Date.formatCodeToRegex("F"));
    },
    n: {
        g: 1,
        c: "m = parseInt(results[{0}], 10) - 1;\n",
        s: "(1[0-2]|[1-9])" // month number without leading zeros (1 - 12)
    },
    Y: {
        g: 1,
        c: "y = parseInt(results[{0}], 10);\n",
        s: "(\\d{4})" // 4-digit year
    },
    y: {
        g: 1,
        c: "var ty = parseInt(results[{0}], 10);\n" +
            "y = ty > me.y2kYear ? 1900 + ty : 2000 + ty;\n", // 2-digit year
        s: "(\\d{2})"
    },
    /*
     * In the am/pm parsing routines, we allow both upper and lower case
     * even though it doesn't exactly match the spec. It gives much more flexibility
     * in being able to specify case insensitive regexes.
     */
    a: {
        g: 1,
        c: "if (/(am)/i.test(results[{0}])) {\n" +
            "if (!h || h == 12) { h = 0; }\n" +
            "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
        s: "(am|pm|AM|PM)",
        calcAtEnd: true
    },
    A: {
        g: 1,
        c: "if (/(am)/i.test(results[{0}])) {\n" +
            "if (!h || h == 12) { h = 0; }\n" +
            "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
        s: "(AM|PM|am|pm)",
        calcAtEnd: true
    },
    g: {
        g: 1,
        c: "h = parseInt(results[{0}], 10);\n",
        s: "(1[0-2]|[0-9])" //  12-hr format of an hour without leading zeroes (1 - 12)
    },
    G: {
        g: 1,
        c: "h = parseInt(results[{0}], 10);\n",
        s: "(2[0-3]|1[0-9]|[0-9])" // 24-hr format of an hour without leading zeroes (0 - 23)
    },
    h: {
        g: 1,
        c: "h = parseInt(results[{0}], 10);\n",
        s: "(1[0-2]|0[1-9])" //  12-hr format of an hour with leading zeroes (01 - 12)
    },
    H: {
        g: 1,
        c: "h = parseInt(results[{0}], 10);\n",
        s: "(2[0-3]|[0-1][0-9])" //  24-hr format of an hour with leading zeroes (00 - 23)
    },
    i: {
        g: 1,
        c: "i = parseInt(results[{0}], 10);\n",
        s: "([0-5][0-9])" // minutes with leading zeros (00 - 59)
    },
    s: {
        g: 1,
        c: "s = parseInt(results[{0}], 10);\n",
        s: "([0-5][0-9])" // seconds with leading zeros (00 - 59)
    },
    u: {
        g: 1,
        c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
        s: "(\\d+)" // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
    },
    U: {
        g: 1,
        c: "u = parseInt(results[{0}], 10);\n",
        s: "(-?\\d+)" // leading minus sign indicates seconds before UNIX epoch
    }
};

/**
 * Un objeto en el cual cada propiedad es una funcion de parseo de fechas. El nombre de la
 * propiedad es el formato que la funcion parsea.
 *
 * Este objeto es automaticamente llenado con las funciones para parsear fechas
 * cuando la funcion `parse` es llamada.
 *
 * Custom parsing functions may be inserted into this object, keyed by a name which from then on
 * may be used as a format string to {@link #parse}.
 *
 * Ejemplo:
 *
 *     Date.parseFunctions['date-format'] = myDateParser;
 *
 *  Una funcion de parseo debe retornar una instancia `Date`, y requiere los siguientes parametros:
 *
 * - `date`: {String} - El string de la fecha a parsear.
 * - `strict`: {Boolean} - `true` para validar el string mientras se parsea
 * (i.e. previene JavaScript Date "rollover").
 * strings invalidos deben retornar ``null` cuando se parsean.
 *
 * @type Object
 */
Date.parseFunctions = {};

/**
 * RegExp usadas en las funciones de parseo
 *
 * @type {Array}
 */
Date.parseRegexes = [];

/**
 * Most of the date-formatting functions below are the excellent work of Baron Schwartz.
 * (see http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/)
 * They generate precompiled functions from format patterns instead of parsing and
 * processing each pattern every time a date is formatted.
 *
 * @type {String}
 */
Date.parserFactoryCode = [
    // date calculations (note: the code below creates a dependency on Number.from())
    "var me = this, dt, y, m, d, h, i, s, ms, o, O, z, zz, u, v, W, year, jan4, week1monday, daysInMonth, dayMatched,",
        "def = {},",
        "from = Number.from,",
        "results = String(input).match(me.parseRegexes[{0}]);", // either null, or an array of matched strings

    "if(results){",
        "{1}",

        "if(u != null){", // i.e. unix time is defined
            "v = new Date(u * 1000);", // give top priority to UNIX time
        "}else{",
            // create Date object representing midnight of the current day;
            // this will provide us with our date defaults
            // (note: clearTime() handles Daylight Saving Time automatically)
            "dt = me.clearTime(new Date);",

            "y = from(y, from(def.y, dt.getFullYear()));",
            "m = from(m, from(def.m - 1, dt.getMonth()));",
            "dayMatched = d !== undefined;",
            "d = from(d, from(def.d, dt.getDate()));",

            // Attempt to validate the day. Since it defaults to today, it may go out
            // of range, for example parsing m/Y where the value is 02/2000 on the 31st of May.
            // It will attempt to parse 2000/02/31, which will overflow to March and end up
            // returning 03/2000. We only do this when we default the day. If an invalid day value
            // was set to be parsed by the user, continue on and either let it overflow or return null
            // depending on the strict value. This will be in line with the normal Date behaviour.

            "if (!dayMatched) {",
                "dt.setDate(1);",
                "dt.setMonth(m);",
                "dt.setFullYear(y);",

                "daysInMonth = me.getDaysInMonth(dt);",
                "if (d > daysInMonth) {",
                    "d = daysInMonth;",
                "}",
            "}",

            "h  = from(h, from(def.h, dt.getHours()));",
            "i  = from(i, from(def.i, dt.getMinutes()));",
            "s  = from(s, from(def.s, dt.getSeconds()));",
            "ms = from(ms, from(def.ms, dt.getMilliseconds()));",

            "if(z >= 0 && y >= 0){",
                // both the year and zero-based day of year are defined and >= 0.
                // these 2 values alone provide sufficient info to create a full date object

                // create Date object representing January 1st for the given year
                // handle years < 100 appropriately
                "v = me.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);",

                // then add day of year, checking for Date "rollover" if necessary
                "v = !strict? v : (strict === true && (z <= 364 || (me.isLeapYear(v) && z <= 365)) ",
                    "? me.add(v, me.DAY, z) : null);",
            "}else if(strict === true && !me.isValid(y, m + 1, d, h, i, s, ms)){", // check for Date "rollover"
                "v = null;", // invalid date, so return null
            "}else{",
                "if (W) {", // support ISO-8601
                    // http://en.wikipedia.org/wiki/ISO_week_date
                    //
                    // Mutually equivalent definitions for week 01 are:
                    // a. the week starting with the Monday which is nearest in time to 1 January
                    // b. the week with 4 January in it
                    // ... there are many others ...
                    //
                    // We'll use letter b above to determine the first week of the year.
                    //
                    // So, first get a Date object for January 4th of whatever calendar year is desired.
                    //
                    // Then, the first Monday of the year can easily be determined by (operating on this Date):
                    // 1. Getting the day of the week.
                    // 2. Subtracting that by one.
                    // 3. Multiplying that by 86400000 (one day in ms).
                    // 4. Subtracting this number of days (in ms) from the January 4 date (represented in ms).
                    //
                    // Example #1 ...
                    //
                    //       January 2012
                    //   Su Mo Tu We Th Fr Sa
                    //    1  2  3  4  5  6  7
                    //    8  9 10 11 12 13 14
                    //   15 16 17 18 19 20 21
                    //   22 23 24 25 26 27 28
                    //   29 30 31
                    //
                    // 1. January 4th is a Wednesday.
                    // 2. Its day number is 3.
                    // 3. Simply substract 2 days from Wednesday.
                    // 4. The first week of the year begins on Monday, January 2. Simple!
                    //
                    // Example #2 ...
                    //       January 1992
                    //   Su Mo Tu We Th Fr Sa
                    //             1  2  3  4
                    //    5  6  7  8  9 10 11
                    //   12 13 14 15 16 17 18
                    //   19 20 21 22 23 24 25
                    //   26 27 28 29 30 31
                    //
                    // 1. January 4th is a Saturday.
                    // 2. Its day number is 6.
                    // 3. Simply subtract 5 days from Saturday.
                    // 4. The first week of the year begins on Monday, December 30. Simple!
                    //
                    // v = Date.clearTime(new Date(week1monday.getTime() + ((W - 1) * 604800000 + 43200000)));
                    // (This is essentially doing the same thing as above but for the week rather than the day)
                    "year = y || (new Date()).getFullYear();",
                    "jan4 = new Date(year, 0, 4, 0, 0, 0);",
                    "d = jan4.getDay();",
                    // If the 1st is a Thursday, then the 4th will be a Sunday, so we need the appropriate
                    // day number here, which is why we use the day === checks.
                    "week1monday = new Date(jan4.getTime() - ((d === 0 ? 6 : d - 1) * 86400000));",
                    // The reason for adding 43200000 (12 hours) is to avoid any complication with daylight saving
                    // switch overs. For example,  if the clock is rolled back, an hour will repeat, so adding 7 days
                    // will leave us 1 hour short (Sun <date> 23:00:00). By setting is to 12:00, subtraction
                    // or addition of an hour won't make any difference.
                    "v = Date.clearTime(new Date(week1monday.getTime() + ((W - 1) * 604800000 + 43200000)));",
                "} else {",
                    // plain old Date object
                    // handle years < 100 properly
                    "v = me.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), me.YEAR, y < 100 ? y - 100 : 0);",
                "}",
            "}",
        "}",
    "}",

    "if(v){",
        // favor UTC offset over GMT offset
        "if(zz != null){",
            // reset to UTC, then add offset
            "v = me.add(v, me.SECOND, -v.getTimezoneOffset() * 60 - zz);",
        "}else if(o){",
            // reset to GMT, then add offset
            "v = me.add(v, me.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
        "}",
    "}",

    "return (v != null) ? v : null;"
].join('\n');

/**
 * Formato default utilizado en funciones
 *
 * @type {String}
 */
Date.defaultFormat = "Y-m-d H:i:s";

/**
 * Verifica si `value` es una instancia de `Date`
 *
 * @param {Object} value
 * @return {Boolean} `true` si es una instancia de `Date`, `false` de lo contrario
 */
Date.isDate = function(value) {
    return Object.prototype.toString.call(value) === "[object Date]";
};

/**
 * Crea y retorna una nueva instancia `Date` con el mismo valor de `date`.
 * Las instancias `Date` son pasadas por referencia esto implica que al copiar una fecha en otra variable
 * ambas variables tanto la vieja como la nueva apuntaran a la misma instancia. Si se pretende que ambas variables
 * tengan diferentes instancias entonces se debe clonar la instancia.
 *
 * @param {Date} date Fecha a clonar
 * @return {Date} Nueva instancia `Date` con la fecha proporcionada
 */
Date.clone = function(date) {
    return new Date(date.getTime());
};

/**
 * Verifica si la fecha proporcionada entra en un año bisiesto.
 *
 * @param {Date} date Fecha a verificar
 * @return {Boolean} `true` si es bisiesto, `false` de lo contrario
 */
Date.isLeapYear = function(date) {
    var year = date.getFullYear();

    return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
};

/**
 * Retorna el numero de dias en el mes de la fecha proporcionada. Ajustado para años bisiestos.
 *
 * @param {Date} date Fecha a evaluar
 * @return {Number} Numero de dias en el mes
 */
Date.getDaysInMonth = function(date) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        m = date.getMonth();

    return m === 1 && Date.isLeapYear(date) ? 29 : daysInMonth[m];
};

/**
 * Retorna la fecha del ultimo dia del mes en que la fecha proporcionada reside.
 *
 * @param {Date} date Fecha
 * @return {Date} Fecha del ultimo dia
 */
Date.getLastDateOfMonth = function(date) {
    return new Date(date.getFullYear(), date.getMonth(), Date.getDaysInMonth(date));
};

/**
 * Retorna la fecha del primer dia del mes en que la fecha proporcionada reside.
 *
 * @param {Date} date Fecha
 * @return {Date} Fecha del primer dia
 */
Date.getFirstDateOfMonth = function(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Provee una forma conveniente para realizar operaciones aritmeticas con fechas. Este metodo no modifica
 * la instancia `Date` proporcionada, crea y retorna una nueva instancia de `Date` con el resultado.
 *
 * @param {Date} date La fecha a modificar
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
 * @param {Date} date Fecha a verificar
 * @param {Date} start Fecha inicial
 * @param {Date} end Fecha final
 * @return {Boolean} `true` si cae entre las fechas, `false` de lo contrario
 */
Date.between = function(date, start, end) {
    var t = date.getTime();

    return start.getTime() <= t && t <= end.getTime();
};

/**
 * Intenta limpiar la informacion del tiempo de la instancia `Date` estableciendola a la medianoche.
 *
 * @param {Date} date Instancia a limpiar
 * @param {Boolean} clone `true` para retornar una nueva instancia
 * @return {Date} `Date` con el tiempo limpio
 */
Date.clearTime = function(date, clone) {
    if (clone) {
        return Date.clearTime(Date.clone(date));
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
 * Calcula cuantas unidades de `unit` hay entre `min` y `max`
 *
 * @param {Date} min Fecha inicial
 * @param {Date} max Fecha final
 * @param {String}  unit Tipo de unidad (e.g. DAY, MONTH, YEAR)
 * @return {Number} Numero de unidades
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
 * @param {Date} date Fecha
 * @return {Number} Numero del dia
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
 * @param {Date} date Fecha
 * @return {Number} Numero de la semana
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
 * @param {Number} month Numero del mes
 * @return {String} Nombre corto del mes
 */
Date.getShortMonthName = function(month) {
    return Date.monthNames[month].substring(0, 3);
};

/**
 * Obtiene la compensacion por la zona horaria.
 *
 * @param {Date} date Fecha
 * @param {Boolean} colon `true` para separar con ":" las horas y minutos
 * @return {String} Compensacion
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
 * @param {Date} date Fecha
 * @return {String} Zona horaria
 */
Date.getTimezone = function(date) {
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
 * @param {Date} date Fecha
 * @return {Number} Numero del dia de la semana
 */
Date.getFirstDayOfMonth = function(date) {
    var day = (date.getDay() - (date.getDate() - 1)) % 7;

    return (day < 0) ? (day + 7) : day;
};

/**
 * Obtiene el ultimo dia del mes de `date`. El valor retornado es un indice del dia de la semana (0-6)
 *
 * @param  {Date} date Fecha
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
 * @param {Date} date Fecha
 * @return {Boolean} `true` si esta afectada, `false` de lo contrario
 */
Date.isDST = function(date) {
    return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() !== date.getTimezoneOffset();
};

/**
 * Verifica si dos instancias `Date` son identicas comparando sus valores
 *
 * @param {Date} date1 Fecha 1
 * @param {Date} date2 Fecha 2
 * @return {Boolean} `true` si ambas instancias son iguales
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
 * @return {Boolean} `true` si es válido, `false` de lo contrario
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
 * Provee una forma conveniente para realizar operaciones aritmeticas con fechas. Este metodo no modifica
 * la instancia `Date` proporcionada, crea y retorna una nueva instancia de `Date` con el resultado.
 *
 * @param {Date} date La fecha a modificar
 * @param {String} interval Intervalo para la operacion
 * @param {Number} value Valor a agregar/restar a la fecha
 * @return {Date} Nueva instancia `Date` con el resultado
 */
Date.subtract = function(date, interval, value) {
    return Date.add(date, interval, -value);
};

/**
 * Remueve los escapes del formato. En formatos, un "\" puede usarse para escape caracteres especiales
 *
 * @param {String} format Formato
 * @return {String} Formato sin escapes
 */
Date.unescapeFormat = function(format) {
    var slashRe = /\\/gi;

    // Escape the format, since \ can be used to escape special
    // characters in a date format. For example, in a Spanish
    // locale the format may be: "d \\de F \\de Y"
    return format.replace(slashRe, "");
};

/**
 * Obtiene un codigo de formato
 *
 * @param {String} character
 */
Date.getFormatCode = function(character) {
    var f = Date.formatCodes[character];

    if (f) {
        f = typeof f === 'function' ? f() : f;
        Date.formatCodes[character] = f; // reassign function result to prevent repeated execution
    }

    // note: unknown characters are treated as literals
    return f || ("'" + String.escape(character) + "'");
};

/**
 * Crea una funcion de formato y la almacena
 *
 * @private
 * @param {String} format
 */
Date.createFormat = function(format) {
    var code = [],
        special = false,
        ch = '',
        i;

    for (i = 0; i < format.length; ++i) {
        ch = format.charAt(i);
        if (!special && ch === "\\") {
            special = true;
        } else if (special) {
            special = false;
            code.push("'" + String.escape(ch) + "'");
        } else {
            if (ch === '\n') {
                code.push("'\\n'");
            } else {
                code.push(Date.getFormatCode(ch));
            }
        }
    }

    Date.formatFunctions[format] = Function.factory("var m=this;return " + code.join('+'));
};

/**
 * Devuelve un `string` con formato `format`
 *
 * @param  {Date} date
 * @return {String} String representando la fecha
 */
Date.format = Date.toFormatString = function(date, format) {
    format = format || Date.defaultFormat || "Y-m-d H:i:s";

    if (!Date.isDate(date)) {
        return "";
    }

    if (Date.formatFunctions[format] == null) {
        Date.createFormat(format);
    }

    return Date.formatFunctions[format].call(date) + '';
};

/**
 * Convierte el codigo de parseo a un objeto usado por la funcion `createParser`
 *
 * @private
 * @param  {String} character
 * @param  {Number} currentGroup
 * @return {Object}
 */
Date.formatCodeToRegex = function(character, currentGroup) {
    // Note: currentGroup - position in regex result array (see notes for Date.parseCodes)
    var p = Date.parseCodes[character];

    if (p) {
        p = typeof p === 'function' ? p() : p;
        Date.parseCodes[character] = p; // reassign function result to prevent repeated execution
    }

    return p ? Object.copyIf({
        c: p.c ? String.format(p.c, currentGroup || "{0}") : p.c
    }, p) : {
        g: 0,
        c: null,
        s: String.escapeRegex(character) // treat unrecognized characters as literals
    };
};

/**
 * Crea una funcion de parseo y la almacena
 *
 * @private
 * @param {String} format
 */
Date.createParser = function(format) {
    var regexNum = Date.parseRegexes.length,
        currentGroup = 1,
        calc = [],
        regex = [],
        special = false,
        ch = "",
        i = 0,
        len = format.length,
        atEnd = [],
        obj;

    for (; i < len; ++i) {
        ch = format.charAt(i);
        if (!special && ch === "\\") {
            special = true;
        } else if (special) {
            special = false;
            regex.push(String.escape(ch));
        } else {
            obj = Date.formatCodeToRegex(ch, currentGroup);
            currentGroup += obj.g;
            regex.push(obj.s);
            if (obj.g && obj.c) {
                if (obj.calcAtEnd) {
                    atEnd.push(obj.c);
                } else {
                    calc.push(obj.c);
                }
            }
        }
    }

    calc = calc.concat(atEnd);

    Date.parseRegexes[regexNum] = new RegExp("^" + regex.join('') + "$", 'i');
    Date.parseFunctions[format] = Function.factory(
        "input",
        "strict",
        String.format(Date.parserFactoryCode, regexNum, calc.join(''))
    );
};

/**
 * Devuelve una instancia de `Date` representando la fecha dada por `input`
 *
 * @param {String} input
 * @param {String} [format="Y-m-d H:i:s"]
 * @param {Boolean} strict
 * @return {Date}
 */
Date.parse = Date.fromFormatString = function(input, format, strict) {
    format = format || Date.defaultFormat || "Y-m-d H:i:s";
    var p = Date.parseFunctions;
    if (p[format] == null) {
        Date.createParser(format);
    }
    return p[format].call(Date, input);
};

return Date;

});
