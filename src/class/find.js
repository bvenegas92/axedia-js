define([
    './class',
    '../regExp/jsNamespaceClass',
    '../array/each',
    '../type/isFunction'
], function($Class, $RegExp, $Array, $Type) {
    /**
     * Encuentra una Clase/Constructor comenzando la busqueda en el ambito global. `className` debe ser del tipo
     * 'Namespace.Subnamespace.Class'
     *
     * @param  {String}  className  Nombre de la clase
     * @param  {Boolean}  safe      `true` para devolver un valor `null` en caso de no encontrar la clase o que
     *                              el objeto encontrado no sea un constructor (function)
     * @return {?Function}          La clase o `null`
     */
    $Class.find = function(className, safe) {
        var namespace = GLOBAL;

        if (!$RegExp.JS_NAMESPACE_CLASS.test(className)) {
            throw new Error('[Axedia.Class.find] Invalid class name "' + className +
                '". Class name must be of kind "Namespace.Subnamespace.Class"');
        }

        $Array.each(className.split('.'), function(name, index) {
            if (name in namespace) {
                namespace = namespace[name];
            } else {
                namespace = null;
                return false;
            }
        });

        if (!safe && namespace == null) {
            throw new Error('[Axedia.Class.find] Class "' + className + '" not found');
        } else if (!safe && !$Type.isFunction(namespace)) {
            throw new Error('[Axedia.Class.find] Object "' + className + '" is not a function');
        }

        return namespace;
    };
});
