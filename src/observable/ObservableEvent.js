define([
    "lang/Object"
], function(
    Object
) {

/**
 * Representa un tipo de evento el cual es agregado a las instancias que son
 * obsevables. Este clase es la encargada de manejar los listeners que se
 * suscriben a el.
 *
 * @param {String} eventName
 * @param {Object} observable
 */
function ObservableEvent(eventName, observable) {
    this.name = eventName
    this.listeners = [];
    this.isSuspended = false;
    this.isFiring = false;
    this.observable = observable;
}

/**
 * `this.name`
 *
 * Nombre del evento
 *
 * @type {String}
 */

/**
 * `this.listeners`
 *
 * Lista de listeners ligados al evento
 *
 * @type {Object[]}
 */

/**
 * `this.isSuspended`
 *
 * Bandera utilizada para saber si el evento se encuentra suspendido
 *
 * @type {Boolean}
 */

/**
 * `this.isFiring`
 *
 * Bandera utilizada para saber si el evento se encuentra ejecutandose
 *
 * @type {Boolean}
 */

/**
 * `this.observable`
 *
 * Referencia a la instancia `Observable` a la cual este evento fue ligada
 *
 * @type {Observable}
 */

/**
 * Agrega un listener al evento
 *
 * @param {Function} handler
 * @param {Object}   scope
 * @param {Object}   [options]
 */
ObservableEvent.prototype.addListener = function(handler, scope, options) {
    var me = this,
        listener = {
            single: false
        },
        listeners;

    if (typeof handler !== "function") {
        throw new Error("Invalid handler for event \"" + me.name + "\"");
    }

    // evita listeners duplicados con el mismo `handler` y `scope`
    if (me.findListener(handler, scope) === -1) {
        Object.copy(listener, options);
        listener.handler = handler;
        listener.scope = scope;

        // Si se esta ejecutando este evento, no se debe interrumpir el ciclo
        if (me.isFiring) {
            me.listeners = me.listeners.slice(0);
        }
        me.listeners.push(listener);
    }
};

/**
 * Encuentra el indice del listener.
 *
 * @param  {Function} handler
 * @param  {Object} scope
 * @return {Number}
 */
ObservableEvent.prototype.findListener = function(handler, scope) {
    var me = this,
        listeners = me.listeners,
        i = listeners.length,
        listener;

    while (i--) {
        listener = listeners[i];
        if (listener) {
            if (listener.handler == handler && listener.scope == scope) {
                return i;
            }
        }
    }

    return -1;
};

/**
 * Remueve un listener a este evento.
 * Es necesario que `handler` y `scope` sean referencias a los proporcionados en `addListener`.
 * En caso que index sea proporcionado, este sera prioridad por encima de `handler` y `scope`
 *
 * @param {Function} handler
 * @param {Object} scope
 * @param {Number} [index]
 */
ObservableEvent.prototype.removeListener = function(handler, scope, index) {
    var me = this,
        index;

    index = index !== null ? index : me.findListener(handler, scope);

    if (index !== -1) {
        // Si se esta ejecutando el evento, no se interfiere con el cilco actual
        if (me.isFiring) {
            me.listeners = me.listeners.slice(0);
        }

        me.listeners.splice(index, 1);
    }
};

/**
 * Verifica si este evento tiene listeners.
 *
 * @return {Boolean}
 */
ObservableEvent.prototype.hasListeners = function() {
    return this.listeners.length > 0;
};

/**
 * Elimina todos los listeners de este evento
 */
ObservableEvent.prototype.clearListeners = function() {
    var me = this,
        listeners = me.listeners,
        i = listeners.length,
        listener;

    while (i--) {
        listener = listeners[i];
        me.removeListener(listener.handler, listener.scope);
    }
};

/**
 * Suspende este evento
 */
ObservableEvent.prototype.suspend = function() {
    this.isSuspended = true;
};

/**
 * Reanuda este evento
 */
ObservableEvent.prototype.resume = function() {
    this.isSuspended = false;
};

/**
 * Dispara el evento con los argumentos proporcionados.
 *
 * El evento se dispara con una copia de los listeners. Esto para evitar que un
 * listener sea agregado/removido durante el ciclo de ejecucion.
 *
 * @return {...Object} args
 */
ObservableEvent.prototype.fire = function() {
    var me = this,
        listeners = me.listeners,
        count = listeners.length,
        listener, handler, scope, args, argsLen, i, isCanceled;

    if (!me.suspended && count > 0) {
        me.isFiring = true;
        args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
        argsLen = args.length;

        for (i = 0; i < count; i++) {
            listener = listeners[i];

            // listener puede estar indefinido si uno de los listeners anteriores
            // destruyo el objeto observable que estaba a la escucha de este evento.
            // Eso podria causar que el loop estuviera corriendo aun despues de
            // no existir
            if (!listener) {
                continue;
            }

            handler = listener.handler;
            scope = listener.scope;

            if (handler) {
                isCanceled = handler.apply(scope, args); // se ejecuta el handler
                if (listener.single) {
                    me.removeListener(handler, scope); // si es single se elimina
                }
                if (isCanceled) {
                    return (me.isFiring = false); // si el evento es cancelado se termina la ejecucion
                }
            }
        }
    }
};

return ObservableEvent;

});
