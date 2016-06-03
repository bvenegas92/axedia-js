define([
    "./class",
    "./find",
    "../array/each",
    "../array/merge",
    "../object/merge",
    "../object/chain",
    "./validateClassName"
], function() {
    /**
     * Define una clase usando un nombre con el patron `Nombre/DeLa/Clase` y un objeto que servira como
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
     * @throws {Error} Lanza un error si la ya existe una propiedad con el nombre de la clase
     * @throws {Error} Lanza un error si la propiedad donde se agregara la clase no es Function|Array|Object
     * @return {Function} Retorna el constructor de la nueva clase
     */
    $.Class.define = function(className, classPrototype) {
        var classConstructor;

        // valida el nombre de la clase
        $.Class.validateClassName(className);

        // valida si la clase ya existe
        if ($.Class.find(className, true)) {
            throw new Error("La clase \"" + className + "\" ya existe");
        }
        // crea el constructor
        classConstructor = _createConstructor();

        // asigna la clase al entorno
        $[className] = classConstructor;

        // busca/carga las dependencias
        _findOrLoadDependencies();

        return classConstructor;

        // encuentra/carga todas las dependencias de la clase
        // si RequireJS esta disponible carga las clases requeridas
        // de lo contrario solo se asegura que las clases requeridas existan
        function _findOrLoadDependencies() {
            var requireArray, parentClass;

            if ($.EXISTE_REQUIREJS) {
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

        function _createPrototypeChain(parentClass) {
            // prototipo del padre
            if (parentClass) {
                classConstructor.prototype = $.Object.chain(parentClass.prototype);
                classConstructor.prototype.parent = parentClass;
            }

            // prototipo de clase
            $.Object.merge(classConstructor.prototype, classPrototype, {$className: className});

            // funciones estaticas
            if (classPrototype.statics) {
                $.Object.merge(classConstructor, classPrototype.statics);
            }

            // remueve `statics` del prototipo
            delete classConstructor.prototype.statics;

            return classConstructor;
        }
    };
});
