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

    if (Object.chain) {
        it('chain debe hacer prototype', function() {
            var value = Object.chain(obj);

            expect(value.__proto__).toEqual(obj);
        });
    }

    if (Object.clear) {
        it('clear debe limpiar', function() {
            var value = Object.clear(obj);

            expect(value).toEqual({});
        });
    }

    if (Object.clone) {
        it('clone debe clonar', function() {
            var value = Object.clone({number: 2});

            expect(value).toEqual({number: 2});
        });
    }

    if (Object.copy) {
        it('copy debe copiar', function() {
            var value = Object.copy({number: 2});

            expect(value).toEqual({number: 2});
        });
    }

    if (Object.copyIf) {
        it('copyIf debe copiar', function() {
            var value = Object.copyIf({number: 2}, obj);

            expect(value.number).toEqual(2);
        });
    }

    if (Object.equals) {
        it('equals debe comparar', function() {
            var value = Object.equals({number: 2}, {number: 2});

            expect(value).toBe(true);
        });
    }

    if (Object.getAllKeys) {
        it('getAllKeys debe obtener las propiedades', function() {
            var value = Object.getAllKeys(obj);

            expect(value).toEqual(['number', 'string', 'array', 'fn', 'boolean']);
        });
    }

    if (Object.getKey) {
        it('getKey debe obtener la propiedad', function() {
            var value = Object.getKey(obj, 1);

            expect(value).toEqual('number');
        });
    }

    if (Object.getKeys) {
        it('getKeys debe obtener las propiedades', function() {
            var value = Object.getKeys(obj);

            expect(value).toEqual(['number', 'string', 'array', 'fn', 'boolean']);
        });
    }

    if (Object.getSize) {
        it('getSize debe obtener el numero de las propiedades', function() {
            var value = Object.getSize(obj);

            expect(value).toEqual(5);
        });
    }

    if (Object.getValues) {
        it('getValues debe obtener los valores', function() {
            var value = Object.getValues(obj);

            expect(value.length).toEqual(5);
        });
    }

    if (Object.isEmpty) {
        it('isEmpty debe verificar si existen propiedades', function() {
            var value = Object.isEmpty(obj);

            expect(value).toBe(false);
        });
    }

    if (Object.merge) {
        it('merge debe unir', function() {
            var value = Object.merge({alfa: 'a'}, {beta: 1});

            expect(value).toEqual({alfa: 'a', beta: 1});
        });
    }
});
