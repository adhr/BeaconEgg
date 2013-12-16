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
