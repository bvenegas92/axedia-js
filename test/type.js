describe("Type", function() {
    if (Axedia.Type) {
        if (Axedia.Type.isArray) {
            it('isArray debe verificar arrays', function() {
                var value = Axedia.Type.isArray([]);

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isBoolean) {
            it('isBoolean debe verificar booleans', function() {
                var value = Axedia.Type.isBoolean(true);

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isDate) {
            it('isDate debe verificar dates', function() {
                var value = Axedia.Type.isDate(new Date());

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isDefined) {
            it('isDefined debe verificar definidos', function() {
                var value = '';
                value = Axedia.Type.isDefined(value);

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isEmpty) {
            it('isEmpty debe verificar vacios', function() {
                var value = Axedia.Type.isEmpty('');

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isFunction) {
            it('isFunction debe verificar funciones', function() {
                function fn() {
                }
                var value = Axedia.Type.isFunction(fn);

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isHtmlElement) {
            it('isHtmlElement debe verificar HTMLELements', function() {
                var value = Axedia.Type.isHtmlElement(1);

                expect(value).toBe(false);
            });
        }

        if (Axedia.Type.isIterable) {
            it('isIterable debe verificar iterables', function() {
                var value = Axedia.Type.isIterable(['alfa', 'beta']);

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isObject) {
            it('isObject debe verificar objetos', function() {
                var value = Axedia.Type.isObject({});

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isNumber) {
            it('isNumber debe verificar numeros', function() {
                var value = Axedia.Type.isNumber(1);

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isNumeric) {
            it('isNumeric debe verificar numericos', function() {
                var value = Axedia.Type.isNumeric('1.2');

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isString) {
            it('isString debe verificar strings', function() {
                var value = Axedia.Type.isString('');

                expect(value).toBe(true);
            });
        }

        if (Axedia.Type.isTextNode) {
            it('isTextNode debe verificar TextNodes', function() {
                var value = Axedia.Type.isTextNode(1);

                expect(value).toBe(false);
            });
        }
    }
});
