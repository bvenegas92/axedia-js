describe("String", function() {
    if (String.capitalize) {
        it('capitalize debe convertir a mayuscula', function() {
            var capitalize = String.capitalize('alfa');

            expect(capitalize).toEqual('Alfa');
        });
    }

    if (String.ellipsis) {
        it('ellipsis debe truncar', function() {
            var ellipsis = String.ellipsis('alfa, beta, gamma & delta', 10, true);

            expect(ellipsis).toEqual('alfa,...');
        });
    }

    if (String.endsWith) {
        it('endsWith debe verificar al final', function() {
            var endsWith = String.endsWith('alfa, beta, gamma & delta', 'delta');

            expect(endsWith).toBe(true);
        });
    }

    if (String.insert) {
        it('insert debe insertar', function() {
            var insert = String.insert('alfa', '-', 2);

            expect(insert).toBe('al-fa');
        });
    }

    if (String.leftPad) {
        it('leftPad debe rellenar por la izquierda', function() {
            var leftPad = String.leftPad('alfa', 10, '-');

            expect(leftPad).toBe('------alfa');
        });
    }

    if (String.random) {
        it('random debe generar un string que haga match con [a-zA-Z0-9]{1, 32}', function() {
            var string = String.random();

            expect(string).toMatch(/[a-zA-Z0-9]{1,32}/);
        });
    }

    if (String.repeat) {
        it('repeat debe repetir', function() {
            var repeat = String.repeat('alfa', 3, '-');

            expect(repeat).toBe('alfa-alfa-alfa');
        });
    }

    if (String.splitWords) {
        it('splitWords debe separar palabras', function() {
            var words = String.splitWords('alfa beta  gamma   delta');

            expect(words).toEqual(['alfa', 'beta', 'gamma', 'delta']);
        });
    }

    if (String.startsWith) {
        it('startsWith debe verificar al principio', function() {
            var startsWith = String.startsWith('alfa, beta, gamma & delta', 'alfa');

            expect(startsWith).toBe(true);
        });
    }

    if (String.toggle) {
        it('toggle debe alternar', function() {
            var toggle = String.toggle('alfa', 'beta', 'alfa');

            expect(toggle).toEqual('beta');
        });
    }

    if (String.trim) {
        it('trim debe eliminar espacions', function() {
            var trim = String.trim('   alfa   ');

            expect(trim).toEqual('alfa');
        });
    }

    if (String.uncapitalize) {
        it('uncapitalize debe eliminar espacions', function() {
            var uncapitalize = String.uncapitalize('Alfa');

            expect(uncapitalize).toEqual('alfa');
        });
    }
});
