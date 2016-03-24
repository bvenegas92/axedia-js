describe("JSON", function() {
    var obj;

    beforeEach(function() {
        obj = {
            n: 1,
            s: 'str',
            fn: function() {

            },
            d: new Date()
        }
    });

    if (Axedia.JSON) {
        /*if (Axedia.JSON.encode) {
            it('encode debe codificar', function() {
                var value = Axedia.JSON.encode(obj);

                expect(typeof value).toEqual('string');
            });
        }

        if (Axedia.JSON.decode) {
            it('encode debe decodificar', function() {
                var value = Axedia.JSON.decode('{"n": 1, "s": "str"}');

                expect(value).toEqual({n: 1, s: "str"});
            });
        }*/
    }
});
