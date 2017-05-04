describe("Date", function() {
    var date;

    beforeEach(function() {
        date = new Date();
    });

    it('isDate', function() {
        var value = Date.isDate(new Date());

        expect(value).toBe(true);
    });

    it('add', function() {
        var value = Date.add(date, Date.DAY, 1);

        expect(value.getDate()).toEqual(new Date().getDate() + 1);
    });

    it('between', function() {
        var value = Date.between(
            new Date(2016, 0, 10),
            new Date(2016, 0, 9),
            new Date(2016, 0, 11)
        ); // Enero 2016

        expect(value).toBe(true);
    });

    it('clearTime', function() {
        var value = Date.clearTime(date);

        expect(value.getHours()).toEqual(0);
    });

    it('clone', function() {
        var value = Date.clone(date);

        expect(value != date).toBe(true);
    });

    it('diff', function() {
        var value = Date.diff(new Date(2016, 0, 10), new Date(2016, 0, 12), Date.DAY);

        expect(value).toEqual(2);
    });

    it('getElapsed', function() {
        var value = Date.getElapsed(new Date(2016, 0, 1, 0, 0, 0), new Date(2016, 0, 2, 0, 0, 0)); // Enero 2016

        expect(value).toEqual(86400000);
    });

    it('getDaysOfYear', function() {
        var value = Date.getDayOfYear(new Date(2016, 0, 10));

        expect(value).toEqual(9);
    });

    it('getFirstDateOfMonth', function() {
        var value = Date.getFirstDateOfMonth(date);

        expect(value.getDate()).toEqual(1);
    });

    it('getFirstDayOfMonth', function() {
        var value = Date.getFirstDayOfMonth(new Date(2016, 2, 12));

        expect(value).toEqual(2);
    });

    it('getWeekOfYear', function() {
        var value = Date.getWeekOfYear(new Date(2016, 2, 12));

        expect(value).toEqual(10);
    });

    it('isDST', function() {
        var value = Date.isDST(new Date(2016, 2, 12));

        expect(value).toBe(false);
    });

    it('isEqual', function() {
        var value = Date.isEqual(new Date(2016, 2, 12), new Date(2016, 2, 12));

        expect(value).toBe(true);
    });

    it('isLeapYear', function() {
        var value = Date.isLeapYear(new Date(2016, 0, 1)); // Enero 2016

        expect(value).toBe(true);
    });

    it('isValid', function() {
        var value = Date.isValid(2016, 3, 14);

        expect(value).toBe(true);
    });

    it('getDaysInMonth', function() {
        var value = Date.getDaysInMonth(new Date(2016, 0, 1)); // Enero 2016

        expect(value).toEqual(31);
    });

    it('getGMTOffset', function() {
        var value = Date.getGMTOffset(new Date(2016, 11, 25)); // Diciembre 2016

        expect(value).toEqual('-0700');
    });

    it('getLastDateOfMonth', function() {
        var value = Date.getLastDateOfMonth(new Date(2016, 0, 1)); // Enero 2016

        expect(value.getDate()).toEqual(31);
    });

    it('getLastDayOfMonth', function() {
        var value = Date.getLastDayOfMonth(new Date(2016, 2, 12));

        expect(value).toEqual(4);
    });

    it('getMonthNumber', function() {
        var value = Date.getMonthNumber('March');

        expect(value).toEqual(2);
    });

    it('getShortDayName', function() {
        var value = Date.getShortDayName(6);

        expect(value).toEqual('Sab');
    });

    it('getShortMonthName', function() {
        var value = Date.getShortMonthName(0);

        expect(value).toEqual('Ene');
    });

    it('subtract', function() {
        var value = Date.subtract(new Date(2016, 2, 14), 'd', 4);

        expect(value.getDate()).toEqual(10);
    });

    it('format', function() {
        var value = Date.format(new Date(2016, 0, 10), "Y-m-d");

        expect(value).toEqual("2016-01-10");
    });

    it('parse', function() {
        var value = Date.parse("2016-01-10", "Y-m-d");

        expect(value.getDate()).toBe(10);
    });
});

