define([
    './class',
    './isRequireJSAvailable',
    '../regExp/jsNamespaceClass'
], function($Class, $RegExp) {
    /**
     * Carga una clase (peticion del archivo js) y ejecuta `fn`. `className` debe ser del tipo
     * 'Namespace.Subnamespace.Class'
     *
     * @param  {String}   className  Nombre de la clase
     * @param  {Function} fn        Funcion a ejecutar despues de cargar el archivo
     */
    $Class.load = function(className, fn) {
        if ($Class.isRequireJSAvailable) {
            if (!$RegExp.JS_NAMESPACE_CLASS.test(className)) {
                throw new Error('[Axedia.Class.load] Invalid class name "' + className +
                    '". Class name must be of kind "Namespace.Subnamespace.Class"');
            }

            define([className.replace(/\./g, '/')], fn);
        } else {
            throw new Error('[Axedia.Class.load] RequireJS must be available to load a class');
        }
    };
});
