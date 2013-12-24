adhr= {};

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

        var handlers = this.events[type],
            params   = Array.prototype.slice.call(arguments);;

        params.shift();

        for (var i = 0; i < handlers.length; i++) {
            handlers[i].apply(null, params);
        }
    };

    ns.EventDispatcher = EventDispatcher;

}(this, document, adhr));

;(function(win, doc, ns) {

    "use strict";

    /**
     * iBeacon 
     * @constructor
     * @extends adhr.EventDispatcher
     */
    function BeaconEgg() {
        ns.beaconegg = this;
        this.regions = [];
    }

    BeaconEgg.prototype = new ns.EventDispatcher;

    /**
     * @const {string}
     */
    BeaconEgg.EVENT_ENTER_REGION = 'adhr.beaconegg.event.enter.region';

    /**
     * @const {string}
     */
    BeaconEgg.EVENT_EXIT_REGION = 'adhr.beaconegg.event.exit.region';

    /**
     * @const {string}
     */
    BeaconEgg.EVENT_RANGE = 'adhr.beaconegg.event.range';

    /**
     * @param {string} uuid region uuid
     * @return {integer}
     */
    BeaconEgg.prototype.findRegionIndexByUUID = function (uuid) {
        var _regions = this.regions.concat([]);
        for (var i = 0; i < _regions.length; ++i) {
            if (_regions[i].uuid === uuid) {
                return i;
            }
        }
    }

    /**
     * @param {string} uuid region uuid
     * @return {adhr.Region}
     */
    BeaconEgg.prototype.findRegionByUUID = function (uuid) {
        return this.regions[this.findRegionIndexByUUID(uuid)];
    }

    /**
     * redirect to start monitoring
     * @param  {adhr.Region} region Region object
     * @return {void}
     */
    BeaconEgg.prototype.startMonitoring = function(region) {
        this.regions.push(region);
        location.href = 'beaconegg://egg/start-monitoring?proximityUUID=' + region.uuid + '&identifier=' + region.identifier;
    };

    /**
     * add enter region event
     * @param {function} callback
     * @return {void}
     */
    BeaconEgg.prototype.enterRegion = function(callback) {
        this.addEventListener(BeaconEgg.EVENT_ENTER_REGION, callback);
    }

    /**
     * add exit region event
     * @param {function} callback
     * @return {void}
     */
    BeaconEgg.prototype.exitRegion = function(callback) {
        this.addEventListener(BeaconEgg.EVENT_EXIT_REGION, callback);
    }

    /**
     * add range event
     * @param {function} callback
     * @return {void}
     */
    BeaconEgg.prototype.range = function(callback) {
        this.addEventListener(BeaconEgg.EVENT_RANGE, callback);
    }

    /**
     * redirect to stop monitoring
     * @param  {adhr.Region} region Region object
     * @return {void}
     */
    BeaconEgg.prototype.stopMonitoring = function(region) {
        this.regions.splice(this.findRegionIndexByUUID(region.uuid), 1);
        location.href = 'beaconegg://egg/stop-monitoring?proximityUUID=' + region.uuid;
    };

    /**
     * dispatch event to enter region
     * @param  {hash} data beacon data
     * @return {void}
     */
    BeaconEgg.prototype.didEnterRegion = function(data) {
        this.dispatchEvent(BeaconEgg.EVENT_ENTER_REGION, this.findRegionByUUID(data.proximityUUID));
    }

    /**
     * dispatch event to exit region
     * @param  {hash} data beacon data
     * @return {void}
     */
    BeaconEgg.prototype.didExitRegion = function(data) {
        this.dispatchEvent(BeaconEgg.EVENT_EXIT_REGION, this.findRegionByUUID(data.proximityUUID));
    }

    /**
     * dispatch event to range
     * @param  {hash} data beacon data
     * @return {void}
     */
    BeaconEgg.prototype.didRange = function(data) {
        var beacons = [];
        for (var i = 0; i < data.beacons.length; i++) {
            beacons.push(new ns.Beacon(data.beacons[i]));
        }
        this.dispatchEvent(BeaconEgg.EVENT_RANGE, beacons);
    }

    // Export
    ns.BeaconEgg = BeaconEgg;

}(this, document, adhr));

;(function(win, doc, ns) {

    "use strict";

    /**
     * Beacon
     * @param {string} id
     * @param {string} uuid
     * @constructor
     */
    function Region(identifier, uuid) {
        this.identifier = identifier;
        this.uuid       = uuid;
    }

    // Export
    ns.Region = Region;

}(this, document, adhr));

;(function(win, doc, ns) {

    "use strict";

    /**
     * Beacon
     * @param {hash} data beacon data.
     * @constructor
     */
    function Beacon(data) {
        this.proximityUUID = data.proximityUUID;
        this.proximity     = data.proximity;
        this.rssi          = data.rssi;
        this.accuracy      = data.accuracy;
        this.major         = data.major;
        this.minor         = data.minor;
    }

    /**
     * @const {string}
     */
    Beacon.PROXIMITY_IMMEDIATE = 'ProximityImmediate';

    /**
     * @const {string}
     */
    Beacon.PROXIMITY_NEAR = 'ProximityNear';

    /**
     * @const {string}
     */
    Beacon.PROXIMITY_FAR = 'ProximityFar';

    /**
     * @const {string}
     */
    Beacon.PROXIMITY_UN_KNOWN = 'ProximityUnKnown';

    /**
     * @return {boolean}
     */
    Beacon.prototype.isImmediate = function() {
        return this.proximity === Beacon.PROXIMITY_IMMEDIATE;
    };

    /**
     * @return {boolean}
     */
    Beacon.prototype.isNear = function() {
        return this.proximity === Beacon.PROXIMITY_NEAR;
    };

    /**
     * @return {boolean}
     */
    Beacon.prototype.isFar = function() {
        return this.proximity === Beacon.PROXIMITY_FAR;
    };

    /**
     * @return {boolean}
     */
    Beacon.prototype.isUnKnown = function() {
        return this.proximity === Beacon.PROXIMITY_UN_KNOWN;
    };

    // Export
    ns.Beacon = Beacon;

}(this, document, adhr));
