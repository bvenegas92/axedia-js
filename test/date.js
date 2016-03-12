describe("Date", function() {
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

        if (Axedia.Date.getDaysInMonth) {
            it('getDaysInMonth debe obtener los dias', function() {
                var value = Axedia.Date.getDaysInMonth(new Date(2016, 0, 1)); // Enero 2016

                expect(value).toEqual(31);
            });
        }

        if (Axedia.Date.getFirstDateOfMonth) {
            it('getFirstDateOfMonth debe obtener la fecha del primer dia del mes', function() {
                var value = Axedia.Date.getFirstDateOfMonth(date); // Enero 2016

                expect(value.getDate()).toEqual(1);
            });
        }

        if (Axedia.Date.getLastDateOfMonth) {
            it('getLastDateOfMonth debe obtener la fecha del ultimo dia del mes', function() {
                var value = Axedia.Date.getLastDateOfMonth(new Date(2016, 0, 1)); // Enero 2016

                expect(value.getDate()).toEqual(31);
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
