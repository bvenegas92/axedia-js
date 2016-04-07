define([
    './class',
    '../regExp/jsNamespaceClass',
    '../array/each',
    '../array/slice',
    '../type/isFunction',
    '../type/isArray',
    '../type/isObject'
], function($Class, $RegExp, $Array, $Type) {
    $Class.define = function(className, classPrototype) {
        var requireArray, newClass;

        // valida el nombre de la clase
        if (!$RegExp.JS_NAMESPACE_CLASS.test(className)) {
            throw new Error('[Axedia.Class] Invalid class name "' + className + '"');
        }/* else if (!isRequireJSAvailable) {
            throw new Error('[Axedia.Class] RequireJS is required to define classes');
        }*/
        newClass = _createConstructor();
        newClass = _getOrCreateNamespace(className, newClass);

        // crea un constructor para la clase
        function _createConstructor() {
            function constructor() {
                // call parent
                /*this.constructor.prototype.load.apply(this, arguments);

                this.load.apply(this, arguments);*/
            }

            return constructor;
        }

        // crea el namespace y regresa la referencia
        function _getOrCreateNamespace(className, constructor) {
            var namespace = GLOBAL,
            pieces = className.split('.'),
            ln = pieces.length;

            $Array.each(pieces, function(name, index) {
                if (index === ln - 1) {
                    // solo un nivel (e.g. 'ExampleClass')
                    if (name in namespace) {
                        // si existe la propiedad en el objeto marca error (incluye la cadena de prototipo)
                        throw new Error('[Axedia.Class] Property "' + name + '" already exists');
                    } else {
                        namespace[name] = constructor; // crea el constructor
                    }
                } else {
                    // dos niveles o mas (e.g. 'Namespace.ExampleClass')
                    if (name in namespace) {
                        if (!$Type.isFunction(namespace[name]) &&
                            !$Type.isArray(namespace[name]) &&
                            !$Type.isObject(namespace[name])) {
                            // necesita ser Function|Array|Object para poder agregar una propiedad
                            throw new Error('[Axedia.Class] Property "' +
                                $Array.slice(pieces, 0, index + 1).join('.') +
                                '" must be a function, an array or an object to build provided namespace instead ' +
                                'type "' + typeof namespace + '" was found'
                            );
                        } else {
                            // si ya existe guarda la referencia
                            namespace = namespace[name];
                        }
                    } else {
                        // si no existe crea un objeto para continuar la cade de namespace y guarda la referencia
                        namespace[name] = {};
                        namespace = namespace[name];
                    }
                }
            });

            return namespace;
        }
    };
});
