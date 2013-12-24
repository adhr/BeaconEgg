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
