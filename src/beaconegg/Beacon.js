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
