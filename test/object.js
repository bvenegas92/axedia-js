describe("Object", function() {
    var obj;

    beforeEach(function() {
        obj = {
            number: 1,
            string: 'str',
            array: [],
            fn: function() {

            },
            boolean: true
        };
    });

    if (Axedia.Object) {
        /*if (Axedia.Object.chain) {
            it('chain debe hacer prototype', function() {
                var value = Axedia.Object.chain(obj);

                expect(value.__proto__).toEqual(obj);
            });
        }

        if (Axedia.Object.clear) {
            it('clear debe limpiar', function() {
                var value = Axedia.Object.clear(obj);

                expect(value).toEqual({});
            });
        }

        if (Axedia.Object.clone) {
            it('clone debe clonar', function() {
                var value = Axedia.Object.clone({number: 2});

                expect(value).toEqual({number: 2});
            });
        }

        if (Axedia.Object.copy) {
            it('copy debe copiar', function() {
                var value = Axedia.Object.copy({number: 2});

                expect(value).toEqual({number: 2});
            });
        }

        if (Axedia.Object.copyIf) {
            it('copyIf debe copiar', function() {
                var value = Axedia.Object.copyIf({number: 2}, obj);

                expect(value.number).toEqual(2);
            });
        }

        if (Axedia.Object.equals) {
            it('equals debe comparar', function() {
                var value = Axedia.Object.equals({number: 2}, {number: 2});

                expect(value).toBe(true);
            });
        }

        if (Axedia.Object.getAllKeys) {
            it('getAllKeys debe obtener las propiedades', function() {
                var value = Axedia.Object.getAllKeys(obj);

                expect(value).toEqual(['number', 'string', 'array', 'fn', 'boolean']);
            });
        }

        if (Axedia.Object.getKey) {
            it('getKey debe obtener la propiedad', function() {
                var value = Axedia.Object.getKey(obj, 1);

                expect(value).toEqual('number');
            });
        }

        if (Axedia.Object.getKeys) {
            it('getKeys debe obtener las propiedades', function() {
                var value = Axedia.Object.getKeys(obj);

                expect(value).toEqual(['number', 'string', 'array', 'fn', 'boolean']);
            });
        }

        if (Axedia.Object.getSize) {
            it('getSize debe obtener el numero de las propiedades', function() {
                var value = Axedia.Object.getSize(obj);

                expect(value).toEqual(5);
            });
        }

        if (Axedia.Object.getValues) {
            it('getValues debe obtener los valores', function() {
                var value = Axedia.Object.getValues(obj);

                expect(value.length).toEqual(5);
            });
        }

        if (Axedia.Object.isEmpty) {
            it('isEmpty debe verificar si existen propiedades', function() {
                var value = Axedia.Object.isEmpty(obj);

                expect(value).toBe(false);
            });
        }

        if (Axedia.Object.merge) {
            it('merge debe unir', function() {
                var value = Axedia.Object.merge({alfa: 'a'}, {beta: 1});

                expect(value).toEqual({alfa: 'a', beta: 1});
            });
        }*/
    }
});
