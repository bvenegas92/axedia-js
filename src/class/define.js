define([
    './class',
    '../array/each',
    '../array/slice',
    '../array/merge',
    '../array/map',
    '../type/isFunction',
    '../type/isArray',
    '../type/isObject',
    '../object/merge',
    '../object/chain',
    './validateClassName',
    './isRequireJSAvailable',
    './find'
], function($Class, $RegExp, $Array, $Type, $Object) {
    /**
     * Define una clase usando un nombre con el patron `Namespace.Subnamespace.Class` y un objeto que servira como
     * prototipo de las nuevas instancias.
     *
     * El prototipo puede llevar cualquier propiedad excepto algunas que son reservadas para uso interno, dichas
     * propiedades son las siguientes:
     *
     * `extend`      {String}:          Nombre de la clase de la cual se extiende.
     * `require`     {String[]}        Nombre de las clases de las que depende.
     * `constructor` {Function}    Funcion que se ejecuta al crear una instancia de la clase.
     *
     * @param  {String}  className       Nombre de la clase
     * @param  {Object}  classPrototype  Prototipo para las instancias
     */
    $Class.define = function(className, classPrototype) {
        var classConstructor;

        // valida el nombre de la clase
        $Class.validateClassName(className);
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

            if ($Class.isRequireJSAvailable()) {
                // si RequireJS esta disponible carga las clases requeridas
                // valida la clase padre
                if (classPrototype.extend) {
                    $Class.validateClassName(classPrototype.extend);
                }
                // valida las clases requeridas
                if (classPrototype.require) {
                    $Array.each(classPrototype.require, $Class.validateClassName);
                }
                requireArray = $Array.merge([], classPrototype.extend || [], classPrototype.require || []);
                requireArray = $Array.map(requireArray, function(item) {
                    return item.replace(/\./g, '/');
                });
                // define la nueva clase usando RequireJS
                define(requireArray, _createPrototypeChain);
            } else {
                if (classPrototype.extend) {
                    // encuentra el constructor de la clase padre
                    parentClass = $Class.find(classPrototype.extend);
                }
                if (classPrototype.require) {
                    // asegura que todas las clases requeridas existan
                    $Array.each(classPrototype.require, function(classRequired) {
                        $Class.find(classRequired);
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
                        namespace[name] = classConstructor; // crea el constructor
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
        }

        function _createPrototypeChain(parentClass) {
            // prototipo del padre
            if (parentClass) {
                classConstructor.prototype = $Object.chain(parentClass.prototype);
                classConstructor.prototype.parent = parentClass;
            }

            // prototipo de clase
            $Object.merge(classConstructor.prototype, classPrototype, {$className: className});

            return classConstructor;
        }
    };
});
