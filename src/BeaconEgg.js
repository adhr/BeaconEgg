;(function(win, doc, ns) {

    "use strict";

    /**
     * iBeacon 
     * @constructor
     * @extends beaconegg.EventDispatcher
     */
    function BeaconEgg() {
        win.beaconegg = this;
    }

    BeaconEgg.prototype = new ns.EventDispatcher;

    /**
     * @const {string}
     */
    BeaconEgg.EVENT_ENTER_REGION = 'beaconegg.event.enter.region';

    /**
     * @const {string}
     */
    BeaconEgg.EVENT_EXIT_REGION = 'beaconegg.event.exit.region';

    /**
     * @const {string}
     */
    BeaconEgg.EVENT_RENGE = 'beaconegg.event.renge';

    /**
     * redirect to start monitoring
     * @param  {beaconegg.Region} region Region object
     * @return {void}
     */
    BeaconEgg.prototype.startMonitoring = function(region) {
        location.href = 'beaconegg://egg/start-monitoring?proximityUUID=' + region.uuid + '&id=' + region.id;
    };

    /**
     * redirect to stop monitoring
     * @param  {beaconegg.Region} region Region object
     * @return {void}
     */
    BeaconEgg.prototype.stopMonitoring = function(region) {
        location.href = 'beaconegg://egg/stop-monitoring?proximityUUID=' + region.uuid;
    };

    /**
     * dispatch event to enter region
     * @param  {hash} data beacon data
     * @return {void}
     */
    BeaconEgg.prototype.didEnterRegion = function(data) {
        this.dispatchEvent(BeaconEgg.EVENT_ENTER_REGION);
    }

    /**
     * dispatch event to exit region
     * @param  {hash} data beacon data
     * @return {void}
     */
    BeaconEgg.prototype.didExitRegion = function(data) {
        this.dispatchEvent(BeaconEgg.EVENT_EXIT_REGION);
    }

    /**
     * dispatch event to renge
     * @param  {hash} data beacon data
     * @return {void}
     */
    BeaconEgg.prototype.didRenge = function(data) {
        this.dispatchEvent(BeaconEgg.EVENT_RENGE);
    }

    // Export
    ns.BeaconEgg = BeaconEgg;

}(this, document, adhr));
