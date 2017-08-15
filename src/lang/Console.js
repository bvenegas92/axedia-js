define([
], function(
) {

/**
 * Descarga `data` en un archivo llamado `filename` del tipo `type`
 *
 * @param  {String|Object} data
 * @param  {String} [filename=output.txt]
 * @param  {String} [type=text/plain]
 */
console.save = function(data, filename, type) {
    var blob, event, anchor;

    if(!data) {
        throw new Error("console.save: No data");
    }

    filename = filename || "output.txt";
    type = type || "text/plain";

    if (typeof data === "object") {
        type = "text/json";
        data = JSON.stringify(data, undefined, 4);
    }

    blob = new Blob([data], {type: type});
    event = document.createEvent('MouseEvents');
    anchor = document.createElement('a');

    anchor.download = filename;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.dataset.downloadurl = [type, anchor.download, anchor.href].join(':');
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    anchor.dispatchEvent(event);
};

return console;

});
