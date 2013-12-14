;(function(win, doc, ns) {

    "use strict";

    /**
     *  @constructor
     *  @class
     *  @extend Object
     */
    function EventDispatcher() {
    }

    /**
     * Eventを格納するオブジェクト
     */
    EventDispatcher.prototype.events = {}

    /**
     * @param  {string} type
     * @return {boolean}
     */
    EventDispatcher.prototype.hasEventListener = function (type) {
        return this.events.hasOwnProperty(type);
    }

    /**
     * @param  {string} type
     * @param  {function} handler
     * @return {boolean}
     */
    EventDispatcher.prototype.removeEventListener = function (type, handler) {
        if (!this.hasEventListener(type)) return false;

        var handlers = this.events[type];
        for (var i = 0; i < handlers.length; i++) {
            if (handlers[i] != handler) continue;

            handlers.splice(i, 1);
            handlers.length == 0 && delete this.events[type];
            return true;
        }

        return false;
    }

    /**
     *  @param  {string}   type
     *  @param  {function} handler
     *  @return {void}
     */
    EventDispatcher.prototype.addEventListener = function(type, handler) {
        if (typeof handler != 'function') return;

        this.hasEventListener(type) || (this.events[type] = []);
        this.events[type].push(handler);
    };

    /**
     *  @param  {string} type
     *  @return {void}
     */
    EventDispatcher.prototype.dispatchEvent = function(type) {
        if (!this.hasEventListener(type)) return;

        var handlers = this.events[type];
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].call();
        }
    };

    ns.EventDispatcher = EventDispatcher;

}(this, document, adhr));
