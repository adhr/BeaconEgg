beaconegg = {};
;(function(win, doc, ns) {

    "use strict";

    /**
     * iBeacon 
     * @constructor
     */
    function BeaconEgg() {
        this.regions = [];
    }

    /**
     * redirect to start monitoring
     * @param  {beaconegg.Region} region Region object
     * @return {void}
     */
    BeaconEgg.prototype.startMonitoring = function(region) {
    };

    /**
     * redirect to stop monitoring
     * @param  {beaconegg.Region} region Region object
     * @return {void}
     */
    BeaconEgg.prototype.stopMonitoring = function(region) {
    };

    /**
     * dispatch event to enter region
     * @param  {hash} data beacon data
     * @return {void}
     */
    BeaconEgg.prototype.didEnterRegion = function(data) {
    }

    /**
     * dispatch event to exit region
     * @param  {hash} data beacon data
     * @return {void}
     */
    BeaconEgg.prototype.didExitRegion = function(data) {
    }

    /**
     * dispatch event to renge
     * @param  {hash} data beacon data
     * @return {void}
     */
    BeaconEgg.prototype.didRenge = function(data) {
    }

    // Export
    ns.BeaconEgg = BeaconEgg;

}(this, document, beaconegg));
