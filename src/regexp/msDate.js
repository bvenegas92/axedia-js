define([
    './regexp'
], function($RegExp) {
    /**
     * MS Date
     *
     * @type {RegExp}
     */
    $RegExp.MSDATE = /^\\?\/Date\(([-+])?(\d+)(?:[+-]\d{4})?\)\\?\/$/;
});
