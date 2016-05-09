describe("Date", function() {
    var date;

    beforeEach(function() {
        date = new Date();
    });

    if (Date.add) {
        it('add debe agregar tiempo', function() {
            var value = Date.add(date, Date.DAY, 1);

            expect(value.getDate()).toEqual(new Date().getDate() + 1);
        });
    }

    if (Date.between) {
        it('between debe verificar si car en un rango de fechas', function() {
            var value = Date.between(
                new Date(2016, 0, 10),
                new Date(2016, 0, 9),
                new Date(2016, 0, 11)
            ); // Enero 2016

            expect(value).toBe(true);
        });
    }

    if (Date.clearTime) {
        it('clearTime debe limpiar el tiempo', function() {
            var value = Date.clearTime(date);

            expect(value.getHours()).toEqual(0);
        });
    }

    if (Date.clone) {
        it('clone debe clonar', function() {
            var value = Date.clone(date);

            expect(value != date).toBe(true);
        });
    }

    if (Date.diff) {
        it('diff debe obtener la diferencia', function() {
            var value = Date.diff(new Date(2016, 0, 10), new Date(2016, 0, 12), Date.DAY);

            expect(value).toEqual(2);
        });
    }

    if (Date.getElapsed) {
        it('getElapsed debe obtener los milisegundos', function() {
            var value = Date.getElapsed(new Date(2016, 0, 1, 0, 0, 0), new Date(2016, 0, 2, 0, 0, 0)); // Enero 2016

            expect(value).toEqual(86400000);
        });
    }

    if (Date.getDayOfYear) {
        it('getDaysOfYear debe obtener los dias del año', function() {
            var value = Date.getDayOfYear(new Date(2016, 0, 10));

            expect(value).toEqual(9);
        });
    }

    if (Date.getFirstDateOfMonth) {
        it('getFirstDateOfMonth debe obtener la fecha del primer dia del mes', function() {
            var value = Date.getFirstDateOfMonth(date);

            expect(value.getDate()).toEqual(1);
        });
    }

    if (Date.getFirstDayOfMonth) {
        it('getFirstDayOfMonth debe obtener el primer dia del mes', function() {
            var value = Date.getFirstDayOfMonth(new Date(2016, 2, 12));

            expect(value).toEqual(2);
        });
    }

    if (Date.getWeekOfYear) {
        it('getWeekOfYear debe obtener el nombre corto del mes', function() {
            var value = Date.getWeekOfYear(new Date(2016, 2, 12));

            expect(value).toEqual(10);
        });
    }

    if (Date.isDST) {
        it('isDST debe obtener el nombre corto del mes', function() {
            var value = Date.isDST(new Date(2016, 2, 12));

            expect(value).toBe(false);
        });
    }

    if (Date.isEqual) {
        it('isEqual debe verificar si son iguales', function() {
            var value = Date.isEqual(new Date(2016, 2, 12), new Date(2016, 2, 12));

            expect(value).toBe(true);
        });
    }

    if (Date.isLeapYear) {
        it('isLeapYear debe verificar si es año bisiesto', function() {
            var value = Date.isLeapYear(new Date(2016, 1, 1)); // Enero 2016

            expect(value).toBe(true);
        });
    }

    if (Date.isValid) {
        it('isValid debe verificar si es valido', function() {
            var value = Date.isValid(2016, 3, 14);

            expect(value).toBe(true);
        });
    }

    if (Date.getDaysInMonth) {
        it('getDaysInMonth debe obtener los dias', function() {
            var value = Date.getDaysInMonth(new Date(2016, 0, 1)); // Enero 2016

            expect(value).toEqual(31);
        });
    }

    if (Date.getGMTOffset) {
        it('getGMTOffset debe obtener la zona horaria', function() {
            var value = Date.getGMTOffset(new Date());

            expect(value).toEqual('-0600');
        });
    }

    if (Date.getLastDateOfMonth) {
        it('getLastDateOfMonth debe obtener la fecha del ultimo dia del mes', function() {
            var value = Date.getLastDateOfMonth(new Date(2016, 0, 1)); // Enero 2016

            expect(value.getDate()).toEqual(31);
        });
    }

    if (Date.getLastDayOfMonth) {
        it('getLastDayOfMonth debe obtener el dia de la semana del ultimo dia del mes', function() {
            var value = Date.getLastDayOfMonth(new Date(2016, 2, 12));

            expect(value).toEqual(4);
        });
    }

    if (Date.getMonthNumber) {
        it('getMonthNumber debe obtener el numero del mes', function() {
            var value = Date.getMonthNumber('March');

            expect(value).toEqual(2);
        });
    }

    if (Date.getShortDayName) {
        it('getShortDayName debe obtener el nombre corto del dia', function() {
            var value = Date.getShortDayName(6);

            expect(value).toEqual('Sat');
        });
    }

    if (Date.getShortMonthName) {
        it('getShortMonthName debe obtener el nombre corto del mes', function() {
            var value = Date.getShortMonthName(0);

            expect(value).toEqual('Jan');
        });
    }

    if (Date.unescapeFormat) {
        it('unescapeFormat debe unescape', function() {
            var value = Date.unescapeFormat('d \\de F \\de Y');

            expect(value).toEqual('d de F de Y');
        });
    }

    if (Date.subtract) {
        it('subtract debe restar', function() {
            var value = Date.subtract(new Date(2016, 2, 14), 'd', 4);

            expect(value.getDate()).toEqual(10);
        });
    }

    /*if (Date.format) {
        it('format debe formatear', function() {
            var value = Date.format(new Date(2016, 0, 10), 'Y-m-d H:i:s');

            expect(value).toEqual('2016-01-10 00:00:00');
        });
    }*/
});
