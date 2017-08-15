define([
    "lang/Object",
    "./ObservableEvent"
], function(
    Object,
    ObservableEvent
) {

/**
 * Mixin `Observable`
 *
 * Este mixin es usado para utilizar el patron Observer.
 *
 * @type {Object}
 */
var Observable = {};

/**
 * `this.events`
 *
 * Lista de eventos agregados a la instancia observable
 *
 * @type {Object}
 */

/**
 * Agrega un listener a esta instancia
 *
 * @param {String} eventName
 * @param {Function} handler
 * @param {Object} [scope]
 * @param {Object} [options] Opciones del evento
 * @param {Boolean} [options.single] Solo se ejecuta una vez el handler del listener
 */
Observable.addListener = function(eventName, handler, scope, options) {
    var me = this,
        event = (me.events || (me.events = {}))[eventName],
        defaultOptions = {
            single: false
        };

    scope = scope || me;
    options = Object.copy(defaultOptions, options);

    if (!handler) {
        throw new Error("Cannot add \"" + eventName + "\" listener. No function specified.");
    }

    // si no existe el evento, se agrega y guarda
    if (!event) {
        event = (me.events[eventName] = new ObservableEvent(eventName, me));
    }

    event.addListener(handler, scope, options);
};

/**
 * Remueve un listener a esta instancia.
 * Es necesario que `handler` y `scope` sean referencias a los proporcionados en `addListener`
 *
 * @param {String} eventName
 * @param {Function} handler
 * @param {Object} [scope]
 */
Observable.removeListener = function(eventName, handler, scope) {
    var me = this,
        event = (me.events || (me.events = {}))[eventName],

    scope = scope || me;

    if (!handler) {
        throw new Error("Cannot remove \"" + eventName + "\" listener. No function specified.");
    }

    if (event) {
        event.removeListener(handler, scope);
    }
};

/**
 * Remueve todos los listeners de los eventos esta instancia
 */
Observable.clearListeners = function() {
    var me = this,
        events = me.events,
        event, key;

    if (events) {
        for (key in events) {
            if (events.hasOwnProperty(key)) {
                event = events[key];
                delete events[key];
                event.clearListeners();
            }
        }
    }
};

/**
 * Verifica si la instancia tiene un listener del evento `eventName`
 *
 * @param  {String} eventName
 * @return {Boolean}
 */
Observable.hasListeners = function(eventName) {
    var me = this,
        event = (me.events || (me.events = {}))[eventName];

    if (event && event.hasListeners()) {
        return true;
    }

    return false;
};

/**
 * Ejecuta el evento con los parametros especificados.
 * Es necesario que `fn` y `scope` sean referencias a los proporcionados en `addListener`
 *
 * @param {String} eventName
 * @param {...Object} args
 */
Observable.fireEvent = function(eventName) {
    var args = Array.prototype.slice.call(arguments, 1),
        event = (me.events || (me.events = {}))[eventName];

    if (event && event.hasListeners()) {
        event.fire.apply(event, args);
    }
};

/**
 * Suspende el evento `eventName`.
 *
 * @param  {String} eventName
 */
Observable.suspendEvent = function(eventName) {
    var me = this,
        event = (me.events || (me.events = {}))[eventName];

    if (event) {
        event.suspend();
    }
};

/**
 * Reanuda el evento `eventName`.
 *
 * @param  {String} eventName
 */
Observable.resumeEvent = function(eventName) {
    var me = this,
        event = (me.events || (me.events = {}))[eventName];

    if (event) {
        event.resume();
    }
};

return Observable;

});
