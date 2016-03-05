define([
    './string',
    '../regExp/spacesTrim'
], function($String, $RegExp) {
    $String.trim = function(string) {
        if (string) {
            string = string.replace($RegExp.SPACES_TRIM, '');
        }
        return string || '';
    };
});
