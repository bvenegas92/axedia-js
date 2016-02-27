define([
    './array',
    './slice'
], function($Array) {
    /*
     * Une multiples arreglos en uno solo con elementos unicos que existen en todos los arreglos proporcionados
     *
     * @param {Array}  array1  Arreglo numero 1
     * @param {Array}  array2  Arreglo numero 2
     * @param {Array}  arrayN  Arreglo numero N
     * @return {Array}         Arreglo interseccion
     */
    $Array.intersect = function() {
        var intersection = [],
            arrays = $Array.slice(arguments),
            arraysLength,
            array,
            arrayLength,
            minArray,
            minArrayIndex,
            minArrayCandidate,
            minArrayLength,
            element,
            elementCandidate,
            elementCount,
            i, j, k;

        if (!arrays.length) {
            return intersection;
        }

        // Find the smallest array
        arraysLength = arrays.length;
        for (i = minArrayIndex = 0; i < arraysLength; i++) {
            minArrayCandidate = arrays[i];
            if (!minArray || minArrayCandidate.length < minArray.length) {
                minArray = minArrayCandidate;
                minArrayIndex = i;
            }
        }

        minArray = $Array.unique(minArray);
        $Array.erase(arrays, minArrayIndex, 1);

        // <ExtJS>
        // Use the smallest unique'd array as the anchor loop. If the other array(s) do contain
        // an item in the small array, we're likely to find it before reaching the end
        // of the inner loop and can terminate the search early.
        minArrayLength = minArray.length;
        arraysLength = arrays.length;
        for (i = 0; i < minArrayLength; i++) {
            element = minArray[i];
            elementCount = 0;

            for (j = 0; j < arraysLength; j++) {
                array = arrays[j];
                arrayLength = array.length;
                for (k = 0; k < arrayLength; k++) {
                    elementCandidate = array[k];
                    if (element === elementCandidate) {
                        elementCount++;
                        break;
                    }
                }
            }

            if (elementCount === arraysLength) {
                intersection.push(element);
            }
        }

        return intersection;
    };
});
