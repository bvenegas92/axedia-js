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

    if (JSON.decode) {
        it('encode debe decodificar', function() {
            var value = JSON.decode('{"n": 1, "s": "str"}');

            expect(value).toEqual({n: 1, s: "str"});
        });
    }

    if (JSON.encode) {
        it('encode debe codificar', function() {
            var value = JSON.encode(obj);

            expect(typeof value).toEqual('string');
        });
    }
});
