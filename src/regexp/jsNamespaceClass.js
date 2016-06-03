define([
    "./regexp"
], function() {
    /**
     * Nombre de Clases estilo `Namespace.SubNamespace.ClassName`
     *
     * @type {RegExp}
     */
    $.RegExp.JS_NAMESPACE_CLASS = /^[a-zA-Z_\$](?:[\w\$]*\/)*[\w\$]*$/;
});
