describe("Type", function() {
    if (Type.isArray) {
        it('isArray debe verificar arrays', function() {
            var value = Type.isArray([]);

            expect(value).toBe(true);
        });
    }

    if (Type.isBoolean) {
        it('isBoolean debe verificar booleans', function() {
            var value = Type.isBoolean(true);

            expect(value).toBe(true);
        });
    }

    if (Type.isDate) {
        it('isDate debe verificar dates', function() {
            var value = Type.isDate(new Date());

            expect(value).toBe(true);
        });
    }

    if (Type.isDefined) {
        it('isDefined debe verificar definidos', function() {
            var value = '';
            value = Type.isDefined(value);

            expect(value).toBe(true);
        });
    }

    if (Type.isEmpty) {
        it('isEmpty debe verificar vacios', function() {
            var value = Type.isEmpty('');

            expect(value).toBe(true);
        });
    }

    if (Type.isFunction) {
        it('isFunction debe verificar funciones', function() {
            function fn() {
            }
            var value = Type.isFunction(fn);

            expect(value).toBe(true);
        });
    }

    if (Type.isHtmlElement) {
        it('isHtmlElement debe verificar HTMLELements', function() {
            var value = Type.isHtmlElement(1);

            expect(value).toBe(false);
        });
    }

    if (Type.isIterable) {
        it('isIterable debe verificar iterables', function() {
            var value = Type.isIterable(['alfa', 'beta']);

            expect(value).toBe(true);
        });
    }

    if (Type.isNumber) {
        it('isNumber debe verificar numeros', function() {
            var value = Type.isNumber(1);

            expect(value).toBe(true);
        });
    }

    if (Type.isNumeric) {
        it('isNumeric debe verificar numericos', function() {
            var value = Type.isNumeric('1.2');

            expect(value).toBe(true);
        });
    }

    if (Type.isObject) {
        it('isObject debe verificar objetos', function() {
            var value = Type.isObject({});

            expect(value).toBe(true);
        });
    }

    if (Type.isString) {
        it('isString debe verificar strings', function() {
            var value = Type.isString('');

            expect(value).toBe(true);
        });
    }

    if (Type.isTextNode) {
        it('isTextNode debe verificar TextNodes', function() {
            var value = Type.isTextNode(1);

            expect(value).toBe(false);
        });
    }
});
