describe("String", function() {
    it('ellipsis', function() {
        var value = String.ellipsis('alfa, beta, gamma & delta', 10, true);

        expect(value).toEqual('alfa,...');
    });

    it('escape', function() {
        var value = String.escape("axedia's");

        expect(value).toEqual("axedia\\'s");
    });

    it('escapeRegex', function() {
        var value = String.escapeRegex("axedia{1,3}");

        expect(value).toEqual("axedia\\{1,3\\}");
    });

    it('insert', function() {
        var value = String.insert("alfaomega", " & ", 4);

        expect(value).toEqual("alfa & omega");
    });

    it('leftPad', function() {
        var value = String.leftPad('alfa', 10, '-');

        expect(value).toBe('------alfa');
    });

    it('rightPad', function() {
        var value = String.rightPad('alfa', 10, '-');

        expect(value).toBe('alfa------');
    });

    it('random', function() {
        var value = String.random(10);

        expect(value).toMatch(/[a-zA-Z0-9]{1,10}/);
    });

    it('splitWords', function() {
        var value = String.splitWords('alfa beta  gamma   delta');

        expect(value).toEqual(['alfa', 'beta', 'gamma', 'delta']);
    });

    it('startsWith', function() {
        var value = String.startsWith('alfa, beta, gamma & delta', 'alfa');

        expect(value).toBe(true);
    });

    it('snakeToCamelCase', function() {
        var value = String.snakeToCamelCase('snake_to_camel_case');

        expect(value).toEqual('snakeToCamelCase');
    });

    it('chunk', function() {
        var value = String.chunk('abcdef');

        expect(value).toEqual(["a", "b", "c", "d", "e", "f"]);
    });

    it('format', function() {
        var value = String.format("{0}, {1}, {2}, {3}", "alfa", "beta", "gamma", "delta");

        expect(value).toEqual("alfa, beta, gamma, delta");
    });

    it('splitParagraphs', function() {
        var value = String.splitParagraphs(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            30,
            true
        );

        expect(value).toEqual([
            "Lorem ipsum dolor sit amet,",
            "consectetur adipiscing elit,",
            "sed do eiusmod tempor",
            "incididunt ut labore et dolore",
            "magna aliqua."
        ]);
    });
});
