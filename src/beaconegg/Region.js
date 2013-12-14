;(function(win, doc, ns) {

    "use strict";

    /**
     * Beacon
     * @param {string} id
     * @param {string} uuid
     * @constructor
     */
    function Region(id, uuid) {
        this.id   = id;
        this.uuid = uuid;
    }

    // Export
    ns.Region = Region;

}(this, document, adhr));
