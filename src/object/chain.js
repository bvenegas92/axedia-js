define([
    './object'
], function($Object) {
    /**
     * Retorna un nuevo objecto cono `object` como prototype
     *
     * @param  {Object}  object  Objeto a usar como prototype
     * @return {Object}          Nuevo Objeto
     */
    $Object.chain = Object.create || (function(object) {
        var Proto = function() {};

        return function(object) {
            Proto.prototype = object;
            var result = new Proto();
            Proto.prototype = null;
            return result;
        };
    })();
});
