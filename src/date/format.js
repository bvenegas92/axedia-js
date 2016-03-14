define([
    './date',
    '../type/isDate',
    '../string/escape',
    '../string/leftPad',
    './getShortDayName',
    './dayNames',
    './getSuffix',
    './getDayOfYear',
    './getWeekOfYear',
    './monthNames',
    './getShortMonthName',
    './getDaysInMonth',
    './isLeapYear',
    './getGMTOffset',
    './getTimezone',
    '../function/factory',
], function($Date, $Type, $Function, $String) {
    /**
     * Formatea una instancia `date` con el formato proporcionado
     *
     * The following is a list of all currently supported formats:
     *
     * The following is a list of all currently supported formats:
     *
     *      Format      Description                                                               Example returned values
     *      ------      -----------------------------------------------------------------------   -----------------------
     *        d         Day of the month, 2 digits with leading zeros                             01 to 31
     *        D         A short textual representation of the day of the week                     Mon to Sun
     *        j         Day of the month without leading zeros                                    1 to 31
     *        l         A full textual representation of the day of the week                      Sunday to Saturday
     *        N         ISO-8601 numeric representation of the day of the week                    1 (for Monday) through 7 (for Sunday)
     *        S         English ordinal suffix for the day of the month, 2 characters             st, nd, rd or th. Works well with j
     *        w         Numeric representation of the day of the week                             0 (for Sunday) to 6 (for Saturday)
     *        z         The day of the year (starting from 0)                                     0 to 364 (365 in leap years)
     *        W         ISO-8601 week number of year, weeks starting on Monday                    01 to 53
     *        F         A full textual representation of a month, such as January or March        January to December
     *        m         Numeric representation of a month, with leading zeros                     01 to 12
     *        M         A short textual representation of a month                                 Jan to Dec
     *        n         Numeric representation of a month, without leading zeros                  1 to 12
     *        t         Number of days in the given month                                         28 to 31
     *        L         Whether it&#39;s a leap year                                                  1 if it is a leap year, 0 otherwise.
     *        o         ISO-8601 year number (identical to (Y), but if the ISO week number (W)    Examples: 1998 or 2004
     *                  belongs to the previous or next year, that year is used instead)
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
     *        O         Difference to Greenwich time (GMT) in hours and minutes                   Example: +1030
     *        P         Difference to Greenwich time (GMT) with colon between hours and minutes   Example: -08:00
     *        T         Timezone abbreviation of the machine running the code                     Examples: EST, MDT, PDT ...
     *        Z         Timezone offset in seconds (negative if west of UTC, positive if east)    -43200 to 50400
     *        c         ISO 8601 date represented as the local time with an offset to UTC appended.
     *                  Notes:                                                                    Examples:
     *                  1) If unspecified, the month / day defaults to the current month / day,   1991 or
     *                     the time defaults to midnight, while the timezone defaults to the      1992-10 or
     *                     browser's timezone. If a time is specified, it must include both hours 1993-09-20 or
     *                     and minutes. The "T" delimiter, seconds, milliseconds and timezone     1994-08-19T16:20+01:00 or
     *                     are optional.                                                          1995-07-18T17:21:28-02:00 or
     *                  2) The decimal fraction of a second, if specified, must contain at        1996-06-17T18:22:29.98765+03:00 or
     *                     least 1 digit (there is no limit to the maximum number                 1997-05-16T19:23:30,12345-0400 or
     *                     of digits allowed), and may be delimited by either a '.' or a ','      1998-04-15T20:24:31.2468Z or
     *                  Refer to the examples on the right for the various levels of              1999-03-14T20:24:32Z or
     *                  date-time granularity which are supported, or see                         2000-02-13T21:25:33
     *                  http://www.w3.org/TR/NOTE-datetime for more info.                         2001-01-12 22:26:34
     *        C         An ISO date string as implemented by the native Date object's             1962-06-17T09:21:34.125Z
     *                  [Date.toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
     *                  method. This outputs the numeric part with *UTC* hour and minute
     *                  values, and indicates this by appending the `'Z'` timezone
     *                  indentifier.
     *        U         Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)                1193432466 or -2138434463
     *        MS        Microsoft AJAX serialized dates                                           \/Date(1238606590509)\/ (i.e. UTC milliseconds since epoch) or
     *                                                                                            \/Date(1238606590509+0800)\/
     *        time      A javascript millisecond timestamp                                        1350024476440
     *        timestamp A UNIX timestamp (same as U)                                              1350024866
     *
     * Example usage (note that you must escape format specifiers with '\\' to render them as character literals):
     *
     *     // Sample date:
     *     // 'Wed Jan 10 2007 15:05:01 GMT-0600 (Central Standard Time)'
     *
     *     var dt = new Date('1/10/2007 03:05:01 PM GMT-0600');
     *     console.log(Ext.Date.format(dt, 'Y-m-d'));                          // 2007-01-10
     *     console.log(Ext.Date.format(dt, 'F j, Y, g:i a'));                  // January 10, 2007, 3:05 pm
     *     console.log(Ext.Date.format(dt, 'l, \\t\\he jS \\of F Y h:i:s A')); // Wednesday, the 10th of January 2007 03:05:01 PM
     *
     * Here are some standard date/time patterns that you might find helpful.  They
     * are not part of the source of Ext.Date, but to use them you can simply copy this
     * block of code into any script that is included after Ext.Date and they will also become
     * globally available on the Date object.  Feel free to add or remove patterns as needed in your code.
     *
     *     Ext.Date.patterns = {
     *         ISO8601Long:"Y-m-d H:i:s",
     *         ISO8601Short:"Y-m-d",
     *         ShortDate: "n/j/Y",
     *         LongDate: "l, F d, Y",
     *         FullDateTime: "l, F d, Y g:i:s A",
     *         MonthDay: "F d",
     *         ShortTime: "g:i A",
     *         LongTime: "g:i:s A",
     *         SortableDateTime: "Y-m-d\\TH:i:s",
     *         UniversalSortableDateTime: "Y-m-d H:i:sO",
     *         YearMonth: "F, Y"
     *     };
     *
     *
     * @param  {Date}    date    Fecha
     * @param  {String}  format  Formato
     * @return {String}          String con el formato
     */
    $Date.format = (function(date, format) {
        var formatCodes = {
            d: "Axedia.String.leftPad(m.getDate(), 2, '0')",
            D: "Axedia.Date.getShortDayName(m.getDay())", // get localized short day name
            j: "m.getDate()",
            l: "Axedia.Date.dayNames[m.getDay()]",
            N: "(m.getDay() ? m.getDay() : 7)",
            S: "Axedia.Date.getSuffix(m)",
            w: "m.getDay()",
            z: "Axedia.Date.getDayOfYear(m)",
            W: "Axedia.String.leftPad(Axedia.Date.getWeekOfYear(m), 2, '0')",
            F: "Axedia.Date.monthNames[m.getMonth()]",
            m: "Axedia.String.leftPad(m.getMonth() + 1, 2, '0')",
            M: "Axedia.Date.getShortMonthName(m.getMonth())", // get localized short month name
            n: "(m.getMonth() + 1)",
            t: "Axedia.Date.getDaysInMonth(m)",
            L: "(Axedia.Date.isLeapYear(m) ? 1 : 0)",
            o: "(m.getFullYear() + (Axedia.Date.getWeekOfYear(m) == 1 && m.getMonth() > 0 ? +1 : " +
                "(Axedia.Date.getWeekOfYear(m) >= 52 && m.getMonth() < 11 ? -1 : 0)))",
            Y: "Axedia.String.leftPad(m.getFullYear(), 4, '0')",
            y: "('' + m.getFullYear()).substring(2, 4)",
            a: "(m.getHours() < 12 ? 'am' : 'pm')",
            A: "(m.getHours() < 12 ? 'AM' : 'PM')",
            g: "((m.getHours() % 12) ? m.getHours() % 12 : 12)",
            G: "m.getHours()",
            h: "Axedia.String.leftPad((m.getHours() % 12) ? m.getHours() % 12 : 12, 2, '0')",
            H: "Axedia.String.leftPad(m.getHours(), 2, '0')",
            i: "Axedia.String.leftPad(m.getMinutes(), 2, '0')",
            s: "Axedia.String.leftPad(m.getSeconds(), 2, '0')",
            u: "Axedia.String.leftPad(m.getMilliseconds(), 3, '0')",
            O: "Axedia.Date.getGMTOffset(m)",
            P: "Axedia.Date.getGMTOffset(m, true)",
            T: "Axedia.Date.getTimezone(m)",
            Z: "(m.getTimezoneOffset() * -60)",

            c: function() { // ISO-8601 -- GMT format
                var c = "Y-m-dTH:i:sP", code = [], i, l = c.length, e;
                for (i = 0; i < l; ++i) {
                    e = c.charAt(i);
                    code.push(e === "T" ? "'T'" : getFormatCode(e)); // treat T as a character literal
                }
                return code.join(" + ");
            },

            C: function() { // ISO-1601 -- browser format. UTC numerics with the 'Z' TZ id.
                return 'm.toISOString()';
            },

            U: "Math.round(m.getTime() / 1000)"
        },
        formatFunctions = {
            "MS": function() {
                // UTC milliseconds since Unix epoch (MS-AJAX serialized date format (MRSF))
                return '\\/Date(' + this.getTime() + ')\\/';
            },
            "time": function() {
                return this.getTime().toString();
            },
            "timestamp": function() {
                return $Date.format(this, 'U');
            }
        };

        function getFormatCode(character) {
            var f = formatCodes[character];

            if (f) {
                f = typeof f === 'function' ? f() : f;
                formatCodes[character] = f; // reassign function result to prevent repeated execution
            }

            // note: unknown characters are treated as literals
            return f || ("'" + $String.escape(character) + "'");
        }

        function createFormat(format) {
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
                    code.push("'" + $String.escape(ch) + "'");
                } else {
                    if (ch === '\n') {
                        code.push("'\\n'");
                    } else {
                        code.push(getFormatCode(ch));
                    }
                }
            }
            formatFunctions[format] = $Function.factory("var m=this;return " + code.join('+'));
        }

        return function(date, format) {
            if (!$Type.isDate(date)) {
                return '';
            }

            if (formatFunctions[format] == null) {
                createFormat(format);
            }

            return formatFunctions[format].call(date) + '';
        };
    })();
});
