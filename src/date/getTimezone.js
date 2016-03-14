define([
    './date'
], function($Date) {
    /**
     * Obtiene la abreviacion de la zona horaria de `date`
     *
     * @param {Date}  date  Fecha
     * @return {String}     Zona horaria
     */
    $Date.getTimezone = function(date) {
        // <ExtJS>
        // the following list shows the differences between date strings from different browsers on a WinXP SP2
        // machine from an Asian locale:
        //
        // Opera  : "Thu, 25 Oct 2007 22:53:45 GMT+0800" -- shortest (weirdest) date string of the lot
        // Safari : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always
        // gives the correct timezone (same as FF)
        // FF     : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always
        // gives the correct timezone
        // IE     : "Thu Oct 25 22:54:35 UTC+0800 2007" -- (Asian system setting) look for 3-4 letter timezone abbrev
        // IE     : "Thu Oct 25 17:06:37 PDT 2007" -- (American system setting) look for 3-4 letter timezone abbrev
        //
        // this crazy regex attempts to guess the correct timezone abbreviation despite these differences.
        // step 1: (?:\((.*)\) -- find timezone in parentheses
        // step 2: ([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?) -- if nothing was found in step 1, find timezone from
        // timezone offset portion of date string
        // step 3: remove all non uppercase characters found in step 1 and 2
        return date.toString()
            .replace(/^.* (?:\((.*)\)|([A-Z]{1,5})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, '$1$2')
            .replace(/[^A-Z]/g, '');
    };
});
