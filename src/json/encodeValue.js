define([
    "./json",
    "../type/isDate",
    "../type/isString",
    "../type/isMSDate",
    "../type/isBoolean",
    "../type/isArray",
    "../type/isObject"
], function() {
    /**
     * Esta funcion codifica todos los valores de JavaScript a su forma JSON. Evita que las funciones sean codificadas
     *
     * @param {Object} o Objeto a codificar
     * @param {Boolean} [newline] Usar saltos de linea
     * @return {String} JSON String
     */
    $.JSON.encodeValue = (function(o, newline) {
        var useHasOwn = !!{}.hasOwnProperty,
        m = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
            "\x0b": "\\u000b" //ie doesn"t handle \v
        },
        charToReplace = /[\\\"\x00-\x1f\x7f-\uffff]/g;

        function pad(n) {
            return n < 10 ? "0" + n : n;
        }

        function encodeDate(o) {
            return "\"" + o.getFullYear() + "-" +
            pad(o.getMonth() + 1) + "-" +
            pad(o.getDate()) + "T" +
            pad(o.getHours()) + ":" +
            pad(o.getMinutes()) + ":" +
            pad(o.getSeconds()) + "\"";
        }

        function encodeMSDate(o) {
            return "\"" + o + "\"";
        }

        function encodeString(s) {
            return "\"" + s.replace(charToReplace, function(a) {
                var c = m[a];
                return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\"";
        }

        function encodeArrayPretty(o, newline) {
            var len = o.length,
                cnewline = newline + "   ",
                sep = "," + cnewline,
                a = ["[", cnewline], // Note newline in case there are no members
                i;

            for (i = 0; i < len; i += 1) {
                a.push($.JSON.encodeValue(o[i], cnewline), sep);
            }

            // Overwrite trailing comma (or empty string)
            a[a.length - 1] = newline + "]";

            return a.join("");
        }

        function encodeArray(o, newline) {
            if (newline) {
                return encodeArrayPretty(o, newline);
            }

            var a = ["[", ""], // Note empty string in case there are no serializable members.
                len = o.length,
                i;
            for (i = 0; i < len; i += 1) {
                a.push($.JSON.encodeValue(o[i]), ",");
            }
            // Overwrite trailing comma (or empty string)
            a[a.length - 1] = "]";
            return a.join("");
        }

        function encodeObjectPretty(o, newline) {
            var cnewline = newline + "   ",
                sep = "," + cnewline,
                a = ["{", cnewline], // Note newline in case there are no members
                i, val;

            for (i in o) {
                val = o[i];
                if (!useHasOwn || o.hasOwnProperty(i)) {
                    // To match JSON.stringify, we shouldn"t encode functions or undefined
                    if (typeof val === "function" || val === undefined) {
                        continue;
                    }
                    a.push($.JSON.encodeValue(i) + ": " + $.JSON.encodeValue(val, cnewline), sep);
                }
            }

            // Overwrite trailing comma (or empty string)
            a[a.length - 1] = newline + "}";

            return a.join("");
        }

        function encodeObject(o, newline) {
            if (newline) {
                return encodeObjectPretty(o, newline);
            }

            var a = ["{", ""], // Note empty string in case there are no serializable members.
                i, val;
            for (i in o) {
                val = o[i];
                if (!useHasOwn || o.hasOwnProperty(i)) {
                    // To match JSON.stringify, we shouldn"t encode functions or undefined
                    if (typeof val === "function" || val === undefined) {
                        continue;
                    }
                    a.push($.JSON.encodeValue(i), ":", $.JSON.encodeValue(val), ",");
                }
            }
            // Overwrite trailing comma (or empty string)
            a[a.length - 1] = "}";
            return a.join("");
        }

        return function(o, newLine) {
            // http://jsperf.com/is-undefined
            if (o === null || o === undefined) {
                return "null";
            } else if ($.Type.isDate(o)) {
                return encodeDate(o);
            } else if ($.Type.isString(o)) {
                if ($.Type.isMSDate(o)) {
                    return encodeMSDate(o);
                } else {
                    return encodeString(o);
                }
            } else if (typeof o === "number") {
                //don"t use isNumber here, since finite checks happen inside isNumber
                return isFinite(o) ? String(o) : "null";
            } else if ($.Type.isBoolean(o)) {
                return String(o);
            }
            // Allow custom zerialization by adding a toJSON method to any object type.
            // Date/String have a toJSON in some environments, so check these first.
            else if (o.toJSON) {
                return o.toJSON();
            } else if ($.Type.isArray(o)) {
                return encodeArray(o, newline);
            } else if ($.Type.isObject(o)) {
                return encodeObject(o, newline);
            } else if (typeof o === "function") {
                return "null";
            }
            return "undefined";
        };
    })();
});
