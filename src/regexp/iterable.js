define([
    './regexp'
], function($RegExp) {
    /**
     * Objeto Iterable
     *
     * @type {RegExp}
     */
    $RegExp.ITERABLE = /\[object\s*(?:Array|Arguments|\w*Collection|\w*List|HTML\s+document\.all\s+class)\]/;
});
