define([
    "./regexp"
], function() {
    /**
     * MS Date
     *
     * @type {RegExp}
     */
    $.RegExp.MSDATE = /^\\?\/Date\(([-+])?(\d+)(?:[+-]\d{4})?\)\\?\/$/;
});
