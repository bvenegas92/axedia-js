define(function(global, namespace) {
    /**
     * Variable a usarse como entorno
     *
     * @type {Object}
     */
    var $ = global[namespace] = global[namespace] || {};

    /**
     * Verifica si RequireJS esta disponible en el ambito global.
     * Esta constante solo se asegura que `requirejs` sea una funcion
     *
     * @type {Boolean}
     */
    $.IS_REQUIREJS_AVAILABLE = typeof global.requirejs === 'function';
});
