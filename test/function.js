describe("Function", function() {
    var fn;

    beforeEach(function() {
        fn = function(a, b) {
            return a + b;
        };
    });

    if (Axedia.Function) {
        /*if (Axedia.Function.clone) {
            it('clone debe clonar', function() {
                var value = Axedia.Function.clone(fn);

                expect(value(1, 2)).toEqual(3);
            });
        }*/
    }
});
