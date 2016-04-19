define([
    './class',
    '../regExp/jsNamespaceClass',
], function($Class, $RegExp) {
    /**
     * Valida los nombres de clases para que sigan el patron `Namespace.Subnamespace.Class`
     *
     * @param {String}   className  Nombre de la clase
     * @param {Boolean}  [safe]     `true` para devolver un valor `false` en caso de no ser nombre valido
     * @return {Boolean}            `true` si es valido, `false` de lo contrario
     */
    $Class.validateClassName = function(className, safe) {
        var isValid = $RegExp.JS_NAMESPACE_CLASS.test(className);
        if (safe) {
            return isValid;
        } else if (isValid) {
            return true;
        } else {
            throw new Error('[Axedia.Class.validateClassName] Invalid class name "' + className + '"');
        }
    };
});
