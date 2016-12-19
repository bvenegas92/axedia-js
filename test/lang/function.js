/*describe("Function", function() {
    var fn;

    beforeEach(function() {
        fn = function(a, b) {
            return a + b;
        };
    });

    it('extends', function() {
        function Shape() {
            this.x = 0;
            this.y = 0;
        }

        Shape.prototype.move = function(x, y) {
            this.x += x;
            this.y += y;
            console.info('Shape moved.');
        };

        function Rectangle() {
            Shape.call(this); // call super constructor.
        }

        Function.extends(Rectangle, Shape);

        var value = new Rectangle();

        expect(value instanceof Rectangle).toBe(true);
        expect(value instanceof Shape).toBe(true);
    });
});
*/
