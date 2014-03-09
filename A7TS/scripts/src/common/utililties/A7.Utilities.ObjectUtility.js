/// <reference path="../../../declarations/jquery.d.ts" />
/// <reference path="../../../declarations/underscore.d.ts" />
var A7;
(function (A7) {
    (function (Utilities) {
        var ObjectUtility = (function () {
            function ObjectUtility() {
            }
            /**
            * Test if all properties and values in calling object are equal to provided object
            * @param {object} objectA - object 1 to source
            * @param {object} objectB - object 2 to target
            * @returns {bool} True is returned if objectB has same properties and values as objectA
            */
            ObjectUtility.ObjectsEqual = function (objectA, objectB) {
                for (var prop in objectA)
                    if (objectB[prop] != objectA[prop])
                        return false;

                return true;
            };

            ObjectUtility.ExtendObject = function (objectToExtend, extendWith) {
                _.extend(objectToExtend, extendWith);
            };

            ObjectUtility.Map = function (source, dest) {
                var destProps = [];

                for (var prop in dest) {
                    destProps.push(prop);
                }

                for (var prop in source) {
                    if ($.inArray(prop, destProps) > -1)
                        dest[prop] = source[prop];
                }
                return dest;
            };
            return ObjectUtility;
        })();
        Utilities.ObjectUtility = ObjectUtility;
    })(A7.Utilities || (A7.Utilities = {}));
    var Utilities = A7.Utilities;
})(A7 || (A7 = {}));
