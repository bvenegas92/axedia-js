define([
    "./class",
    "../array/each",
    "../array/slice",
    "../array/merge",
    "../array/map",
    "../type/isFunction",
    "../type/isArray",
    "../type/isObject",
    "../object/merge",
    "../object/chain",
    "./validateClassName",
    "./find"
], function() {
    /**
     * Define una clase usando un nombre con el patron `Namespace.Subnamespace.Class` y un objeto que servira como
     * prototipo de las nuevas instancias.
     *
     * El prototipo puede llevar cualquier propiedad excepto algunas que son reservadas para uso interno, dichas
     * propiedades son las siguientes:
     *
     * `extend` {String} Nombre de la clase de la cual se extiende.
     * `require` {String[]} Nombre(s) de la(s) clase(s) de la(s) que depende.
     * `constructor` {Function} Funcion que se ejecuta al crear una instancia de la clase.
     *
     * @param {String} className Nombre de la clase
     * @param {Object} classPrototype Prototipo para las instancias
     */
    $.Class.define = function(className, classPrototype) {
        var classConstructor;

        // valida el nombre de la clase
        $.Class.validateClassName(className);
        // crea el constructor
        classConstructor = _createConstructor();
        // crea el namespace
        _createNamespace();
        // busca/carga las dependencias
        _findOrLoadDependencies();

        return classConstructor;

        // encuentra/carga todas las dependencias de la clase
        // si RequireJS esta disponible carga las clases requeridas
        // de lo contrario solo se asegura que las clases requeridas existan
        function _findOrLoadDependencies() {
            var requireArray, parentClass;

            if ($.Class.isRequireJSAvailable()) {
                // si RequireJS esta disponible carga las clases requeridas
                // valida la clase padre
                if (classPrototype.extend) {
                    $.Class.validateClassName(classPrototype.extend);
                }
                // valida las clases requeridas
                if (classPrototype.require) {
                    $.Array.each(classPrototype.require, $.Class.validateClassName);
                }
                requireArray = $.Array.merge([], classPrototype.extend || [], classPrototype.require || []);
                requireArray = $.Array.map(requireArray, function(item) {
                    return item.replace(/\./g, "/");
                });
                // define la nueva clase usando RequireJS
                define(requireArray, _createPrototypeChain);
            } else {
                if (classPrototype.extend) {
                    // encuentra el constructor de la clase padre
                    parentClass = $.Class.find(classPrototype.extend);
                }
                if (classPrototype.require) {
                    // asegura que todas las clases requeridas existan
                    $.Array.each(classPrototype.require, function(classRequired) {
                        $.Class.find(classRequired);
                    });
                }
                // crea la cadena de prototipo
                _createPrototypeChain(parentClass);
            }
        }

        // crea un constructor para la clase
        function _createConstructor() {
            function constructor() {
                // ejecuta el costructor padre
                if (constructor.prototype.parent) {
                    constructor.prototype.parent.apply(this, arguments);
                }
                // ejecuta el constructor propio
                if (constructor.constructor !== constructor) {
                    constructor.prototype.constructor.apply(this, arguments);
                }
            }

            return constructor;
        }

        // crea el namespace y asigna el constructor
        function _createNamespace() {
            var ref = GLOBAL,
            pieces = className.split("."),
            ln = pieces.length;

            $.Array.each(pieces, function(name, index) {
                if (index === ln - 1) {
                    // solo un nivel (e.g. "ExampleClass")
                    if (name in ref) {
                        // si existe la propiedad en el objeto marca error (incluye la cadena de prototipo)
                        throw new Error("[" + namespace + ".Class] La propiedad \"" + name + "\" ya existe");
                    } else {
                        ref[name] = classConstructor; // crea el constructor
                    }
                } else {
                    // dos niveles o mas (e.g. "Namespace.ExampleClass")
                    if (name in ref) {
                        if (!$.Type.isFunction(ref[name]) &&
                            !$.Type.isArray(ref[name]) &&
                            !$.Type.isObject(ref[name])) {
                            // necesita ser Function|Array|Object para poder agregar una propiedad
                            throw new Error("[" + namespace + ".Class] La propiedad \"" +
                                $.Array.slice(pieces, 0, index + 1).join(".") +
                                "\" debe ser del tipo Function, Array u Object " +
                                "para crear el nombre de clase proporcionado, en su lugar " +
                                "type \"" + (typeof ref) + "\" fue encontrado."
                            );
                        } else {
                            // si ya existe guarda la referencia
                            ref = ref[name];
                        }
                    } else {
                        // si no existe crea un objeto para continuar la cade de namespace y guarda la referencia
                        ref[name] = {};
                        ref = ref[name];
                    }
                }
            });
        }

        function _createPrototypeChain(parentClass) {
            // prototipo del padre
            if (parentClass) {
                classConstructor.prototype = $.Object.chain(parentClass.prototype);
                classConstructor.prototype.parent = parentClass;
            }

            // prototipo de clase
            $.Object.merge(classConstructor.prototype, classPrototype, {$className: className});

            return classConstructor;
        }
    };
});
