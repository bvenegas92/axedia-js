describe("Array", function() {
    var items = [];

    beforeEach(function() {
        items = ['alfa', 'beta', 'gamma', 'delta'];
    });

    if (Axedia.Array) {
        if (Axedia.Array.each) {
            it('each debe invocar 4 veces la funcion', function() {
                var on = {
                    each: function(item, index) {
                    }
                };

                spyOn(on, 'each');
                Axedia.Array.each(items, on.each);
                expect(on.each).toHaveBeenCalledTimes(4);
            });
        }

        if (Axedia.Array.indexOf) {
            it('indexOf debe ser 1', function() {
                var index;

                index = Axedia.Array.indexOf(items, 'beta');
                expect(index).toBe(1);
            });
        }

        if (Axedia.Array.map) {
            it('map debe agregar el prefijo "item_" a los elementos', function() {
                var newItems = Axedia.Array.map(items, function(item) {
                    return 'item_' + item;
                });

                expect(newItems).toEqual(['item_alfa', 'item_beta', 'item_gamma', 'item_delta']);
            });
        }

        if (Axedia.Array.merge) {
            it('merge debe unir todos los arreglos', function() {
                var newItems = Axedia.Array.merge(items, ['a', 'b', 'c'], ['a', 1, 2, 3]);

                expect(newItems).toEqual(['alfa', 'beta', 'gamma', 'delta', 'a', 'b', 'c', 1, 2, 3]);
            });
        }

        if (Axedia.Array.slice) {
            it('slice debe partir el arreglo', function() {
                var newItems = Axedia.Array.slice(items, 0, 2);

                expect(newItems).toEqual(['alfa', 'beta']);
            });
        }

        if (Axedia.Array.unique) {
            it('unique debe evitar duplicados', function() {
                var newItems = Axedia.Array.unique(['alfa', 'beta', 'gamma', 'alfa', 'delta']);

                expect(items).toEqual(newItems);
            });
        }

        if (Axedia.Array.clean) {
            it('clean debe evitar vacios', function() {
                var newItems = Axedia.Array.clean(['alfa', 'beta', 'gamma', 'delta', '']);

                expect(items).toEqual(newItems);
            });
        }

        if (Axedia.Array.clone) {
            it('clone debe clonar sin referenciar', function() {
                var newItems = Axedia.Array.clone(items);

                expect(newItems == items).toBe(false);
            });
        }

        if (Axedia.Array.contains) {
            it('contains debe verificar si lo contiene', function() {
                var contains = Axedia.Array.contains(items, 'alfa');

                expect(contains).toBe(true);
            });
        }

        if (Axedia.Array.difference) {
            it('difference debe verificar las diferencias', function() {
                var difference = Axedia.Array.difference(items, ['alfa', 'beta']);

                expect(difference).toEqual(['gamma', 'delta']);
            });
        }

        if (Axedia.Array.erase) {
            it('erase debe eliminar', function() {
                var erase = Axedia.Array.erase(items, 1, 2);

                expect(erase).toEqual(['alfa', 'delta']);
            });
        }

        if (Axedia.Array.replace) {
            it('replace debe remplazar', function() {
                var replace = Axedia.Array.replace(items, 1, 2, ['a', 'b', 'c']);

                expect(replace).toEqual(['alfa', 'a', 'b', 'c', 'delta']);
            });
        }

        if (Axedia.Array.every) {
            it('every debe retornar true', function() {
                var every = Axedia.Array.every(items, function(item) {
                    return /alfa|beta|gamma|delta/.test(item);
                });

                expect(every).toBe(true);
            });
        }

        if (Axedia.Array.filter) {
            it('filter debe filtrar', function() {
                var filter = Axedia.Array.filter(items, function(item) {
                    return /alfa|delta/.test(item);
                });

                expect(filter).toEqual(['alfa', 'delta']);
            });
        }

        if (Axedia.Array.findBy) {
            it('findBy debe encontrar un elemento', function() {
                var find = Axedia.Array.findBy(items, function(item) {
                    return item === 'beta';
                });

                expect(find).toEqual('beta');
            });
        }

        if (Axedia.Array.flatten) {
            it('flatten debe aplanar', function() {
                var flatten = Axedia.Array.flatten([
                    'alfa',
                    [
                        'beta',
                        [
                            'gamma',
                            [
                                'delta'
                            ]
                        ]
                    ]
                ]);

                expect(flatten).toEqual(items);
            });
        }

        if (Axedia.Array.from) {
            it('from debe convertir', function() {
                var from = Axedia.Array.from('alfa');

                expect(from).toEqual(['alfa']);
            });
        }

        if (Axedia.Array.toArray) {
            it('toArray debe convertir', function() {
                var toArray = Axedia.Array.toArray('alfa');

                expect(toArray).toEqual(['a', 'l', 'f', 'a']);
            });
        }

        if (Axedia.Array.include) {
            it('include debe incluir sin duplicar', function() {
                var include = ['alfa', 'beta', 'gamma'];
                Axedia.Array.include(include, 'delta');

                expect(include).toEqual(items);
            });
        }

        if (Axedia.Array.insert) {
            it('insert debe insertar', function() {
                var insert = ['alfa', 'beta', 'gamma'];
                insert = Axedia.Array.insert(insert, 2, ['delta']);

                expect(insert).toEqual(['alfa', 'beta', 'delta', 'gamma']);
            });
        }

        if (Axedia.Array.intersect) {
            it('intersect debe intersectar', function() {
                var arr1 = ['alfa', 'beta', 'gamma'],
                arr2 = ['alfa', 'delta'],
                arr3 = ['alfa', 'gamma'];
                intersect = Axedia.Array.intersect(arr1, arr2, arr3);

                expect(intersect).toEqual(['alfa']);
            });
        }

        if (Axedia.Array.max) {
            it('max debe obtener el maximo', function() {
                var max = Axedia.Array.max([1, 2, 3]);

                expect(max).toEqual(3);
            });
        }

        if (Axedia.Array.mean) {
            it('mean debe promediar', function() {
                var mean = Axedia.Array.mean([1, 2, 3]);

                expect(mean).toEqual(2);
            });
        }

        if (Axedia.Array.sum) {
            it('sum debe sumar', function() {
                var sum = Axedia.Array.sum([1, 2, 3]);

                expect(sum).toEqual(6);
            });
        }

        if (Axedia.Array.min) {
            it('min debe obtener el minimo', function() {
                var min = Axedia.Array.min([1, 2, 3]);

                expect(min).toEqual(1);
            });
        }

        if (Axedia.Array.pluck) {
            it('pluck debe tomar la propiedad', function() {
                var pluck = Axedia.Array.pluck([
                    {
                        alfa: 'a',
                        beta: 'b'
                    },
                    {
                        alfa: 'a',
                        gamma: 'g'
                    },
                    {
                        alfa: 'a',
                        delta: 'd'
                    }
                ], 'alfa');

                expect(pluck).toEqual(['a', 'a', 'a']);
            });
        }

        if (Axedia.Array.push) {
            it('push debe agregar al final', function() {
                var push = Axedia.Array.push(items, 'epsilon');

                expect(push).toEqual(['alfa', 'beta', 'gamma', 'delta', 'epsilon']);
            });
        }

        if (Axedia.Array.remove) {
            it('remove debe remover', function() {
                var remove = Axedia.Array.remove(items, 'alfa');

                expect(remove).toEqual(['beta', 'gamma', 'delta']);
            });
        }

        if (Axedia.Array.some) {
            it('some debe retornar true', function() {
                var some = Axedia.Array.some(items, function(item) {
                    return /alfa|beta|gamma|delta/.test(item);
                });

                expect(some).toBe(true);
            });
        }

        if (Axedia.Array.sort) {
            it('sort debe ordenar', function() {
                var sort = Axedia.Array.sort(items);

                expect(sort).toEqual(['alfa', 'beta', 'delta', 'gamma']);
            });
        }

        if (Axedia.Array.splice) {
            it('splice debe empalmar', function() {
                Axedia.Array.splice(items, 2, 1, 'epsilon');

                expect(items).toEqual(['alfa', 'beta', 'epsilon', 'delta']);
            });
        }

        if (Axedia.Array.toMap) {
            it('toMap debe mapear', function() {
                var toMap = Axedia.Array.toMap(items);

                expect(toMap).toEqual({
                    alfa: 1,
                    beta: 2,
                    gamma: 3,
                    delta: 4
                });
            });
        }

        if (Axedia.Array.toValueMap) {
            it('toValueMap debe mapear', function() {
                var toValueMap = Axedia.Array.toValueMap(items);

                expect(toValueMap).toEqual({
                    alfa: 'alfa',
                    beta: 'beta',
                    gamma: 'gamma',
                    delta: 'delta'
                });
            });
        }
    }
});
