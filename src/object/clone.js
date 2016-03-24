define([
    './object',
    '../var/object/toString'
], function($Object, objectToString) {
    /**
     * Clona las propiedades simples de un objeto incluyendo:
     * - Array
     * - {} objetos literales
     * - DOM Nodes
     * - Date
     *
     * @param  {Object} item  Objeto a clonar
     * @return {Object}       Clon del objeto
     */
    $Object.clone = function(item) {
        if (item === null || item === undefined) {
            return item;
        }

        // DOM nodes
        // TODO proxy this to Ext.Element.clone to handle automatic id attribute changing
        // recursively
        if (item.nodeType && item.cloneNode) {
            return item.cloneNode(true);
        }

        var type = objectToString.call(item),
            i, j, k, clone, key;

        // Date
        if (type === '[object Date]') {
            return new Date(item.getTime());
        }

        // Array
        if (type === '[object Array]') {
            i = item.length;

            clone = [];

            while (i--) {
                clone[i] = $Object.clone(item[i]);
            }
        }
        // Object
        else if (type === '[object Object]' && item.constructor === Object) {
            clone = {};

            for (key in item) {
                clone[key] = $Object.clone(item[key]);
            }
        }

        return clone || item;
    };
});
