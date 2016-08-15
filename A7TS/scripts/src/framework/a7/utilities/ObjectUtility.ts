/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../../../../declarations/underscore/underscore.d.ts" />

namespace A7.Utilities {

    export class ObjectUtility {

        /**
             * Test if all properties and values in calling object are equal to provided object
             * @param {object} objectA - object 1 to source
             * @param {object} objectB - object 2 to target
             * @returns {bool} True is returned if objectB has same properties and values as objectA
        */
        static ObjectsEqual(objectA: {}, objectB: {}): boolean {
            for (var prop in objectA)
                if (objectB[prop] != objectA[prop])
                    return false;

            return true;
        }

        static ExtendObject(objectToExtend: {}, extendWith: {}): void {
            _.extend(objectToExtend, extendWith);
        }

        static Map(source: {}, dest: {}): {} {
            var destProps = [];

            for (var prop in dest) {
                destProps.push(prop);
            }

            for (var prop in source) {
                if ($.inArray(prop, destProps) > -1) dest[prop] = source[prop];
            }
            return dest;
        }

        static GetObjectName(object: any) {
            return object.constructor.toString().match(/function\s*(\w+)/)[1];
        }
    }

}