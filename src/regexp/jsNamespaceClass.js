define([
    './regexp'
], function($RegExp) {
    /**
     * Nombre de Clases estilo `Namespace.SubNamespace.ClassName`
     *
     * @type {RegExp}
     */
    $RegExp.JS_NAMESPACE_CLASS = /^([a-zA-Z_\$][a-zA-Z\d_\$]*\.)*[a-zA-Z_\$][a-zA-Z\d_\$]*$/;
});
