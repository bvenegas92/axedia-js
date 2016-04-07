/*describe("Date", function() {
    var date;

    beforeEach(function() {
        date = new Date();
    });

    if (Axedia.Date) {
        if (Axedia.Date.add) {
            it('add debe agregar tiempo', function() {
                var value = Axedia.Date.add(date, Axedia.Date.DAY, 1);

                expect(value.getDate()).toEqual(new Date().getDate() + 1);
            });
        }

        if (Axedia.Date.between) {
            it('between debe verificar si car en un rango de fechas', function() {
                var value = Axedia.Date.between(
                    new Date(2016, 0, 10),
                    new Date(2016, 0, 9),
                    new Date(2016, 0, 11)
                ); // Enero 2016

                expect(value).toBe(true);
            });
        }

        if (Axedia.Date.clearTime) {
            it('clearTime debe limpiar el tiempo', function() {
                var value = Axedia.Date.clearTime(date);

                expect(value.getHours()).toEqual(0);
            });
        }

        if (Axedia.Date.clone) {
            it('clone debe clonar', function() {
                var value = Axedia.Date.clone(date);

                expect(value != date).toBe(true);
            });
        }

        if (Axedia.Date.diff) {
            it('diff debe obtener la diferencia', function() {
                var value = Axedia.Date.diff(new Date(2016, 0, 10), new Date(2016, 0, 12), Axedia.Date.DAY);

                expect(value).toEqual(2);
            });
        }

        if (Axedia.Date.format) {
            it('format debe formatear', function() {
                var value = Axedia.Date.format(new Date(2016, 0, 10), 'Y-m-d H:i:s');

                expect(value).toEqual('2016-01-10 00:00:00');
            });
        }

        if (Axedia.Date.getDayOfYear) {
            it('getDaysOfYear debe obtener los dias del año', function() {
                var value = Axedia.Date.getDayOfYear(new Date(2016, 0, 10));

                expect(value).toEqual(9);
            });
        }

        if (Axedia.Date.getDaysInMonth) {
            it('getDaysInMonth debe obtener los dias', function() {
                var value = Axedia.Date.getDaysInMonth(new Date(2016, 0, 1)); // Enero 2016

                expect(value).toEqual(31);
            });
        }

        if (Axedia.Date.getElapsed) {
            it('getElapsed debe obtener los milisegundos', function() {
                var value = Axedia.Date.getElapsed(new Date(2016, 0, 1, 0, 0, 0), new Date(2016, 0, 2, 0, 0, 0)); // Enero 2016

                expect(value).toEqual(86400000);
            });
        }

        if (Axedia.Date.getFirstDateOfMonth) {
            it('getFirstDateOfMonth debe obtener la fecha del primer dia del mes', function() {
                var value = Axedia.Date.getFirstDateOfMonth(date);

                expect(value.getDate()).toEqual(1);
            });
        }

        if (Axedia.Date.getFirstDayOfMonth) {
            it('getFirstDayOfMonth debe obtener el primer dia del mes', function() {
                var value = Axedia.Date.getFirstDayOfMonth(new Date(2016, 2, 12));

                expect(value).toEqual(2);
            });
        }

        if (Axedia.Date.getGMTOffset) {
            it('getGMTOffset debe obtener la zona horaria', function() {
                var value = Axedia.Date.getGMTOffset(new Date());

                expect(value).toEqual('-0700');
            });
        }

        if (Axedia.Date.getLastDateOfMonth) {
            it('getLastDateOfMonth debe obtener la fecha del ultimo dia del mes', function() {
                var value = Axedia.Date.getLastDateOfMonth(new Date(2016, 0, 1)); // Enero 2016

                expect(value.getDate()).toEqual(31);
            });
        }

        if (Axedia.Date.getLastDayOfMonth) {
            it('getLastDayOfMonth debe obtener el dia de la semana del ultimo dia del mes', function() {
                var value = Axedia.Date.getLastDayOfMonth(new Date(2016, 2, 12));

                expect(value).toEqual(4);
            });
        }

        if (Axedia.Date.getMonthNumber) {
            it('getMonthNumber debe obtener el numero del mes', function() {
                var value = Axedia.Date.getMonthNumber('March');

                expect(value).toEqual(2);
            });
        }

        if (Axedia.Date.getShortDayName) {
            it('getShortDayName debe obtener el nombre corto del dia', function() {
                var value = Axedia.Date.getShortDayName(6);

                expect(value).toEqual('Sat');
            });
        }

        if (Axedia.Date.getShortMonthName) {
            it('getShortMonthName debe obtener el nombre corto del mes', function() {
                var value = Axedia.Date.getShortMonthName(0);

                expect(value).toEqual('Jan');
            });
        }

        if (Axedia.Date.getWeekOfYear) {
            it('getWeekOfYear debe obtener el nombre corto del mes', function() {
                var value = Axedia.Date.getWeekOfYear(new Date(2016, 2, 12));

                expect(value).toEqual(10);
            });
        }

        if (Axedia.Date.isDST) {
            it('isDST debe obtener el nombre corto del mes', function() {
                var value = Axedia.Date.isDST(new Date(2016, 2, 12));

                expect(value).toBe(false);
            });
        }

        if (Axedia.Date.isEqual) {
            it('isEqual debe verificar si son iguales', function() {
                var value = Axedia.Date.isEqual(new Date(2016, 2, 12), new Date(2016, 2, 12));

                expect(value).toBe(true);
            });
        }

        if (Axedia.Date.isValid) {
            it('isValid debe verificar si es valido', function() {
                var value = Axedia.Date.isValid(2016, 3, 14);

                expect(value).toBe(true);
            });
        }

        if (Axedia.Date.subtract) {
            it('subtract debe restar', function() {
                var value = Axedia.Date.subtract(new Date(2016, 2, 14), 'd', 4);

                expect(value.getDate()).toEqual(10);
            });
        }

        if (Axedia.Date.unescapeFormat) {
            it('unescapeFormat debe unescape', function() {
                var value = Axedia.Date.unescapeFormat('d \\de F \\de Y');

                expect(value).toEqual('d de F de Y');
            });
        }

        if (Axedia.Date.isLeapYear) {
            it('isLeapYear debe verificar si es año bisiesto', function() {
                var value = Axedia.Date.isLeapYear(new Date(2016, 1, 1)); // Enero 2016

                expect(value).toBe(true);
            });
        }
    }
});
*/
