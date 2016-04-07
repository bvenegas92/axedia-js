define([
    './class'
], function($Class) {
    /**
     * Verifica si RequireJS esta disponible en el ambito global. Esta funcion solo asegura que
     * `requirejs` === `function`
     *
     * @return {Boolean}  `true` si esta disponible, `false` de lo contrario
     */
    $Class.isRequireJSAvailable = function() {
        return typeof GLOBAL.requirejs === 'function';
    };
});
