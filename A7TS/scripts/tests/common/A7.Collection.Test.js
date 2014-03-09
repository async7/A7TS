/// <chutzpah_reference path="../../lib/underscore-1.5.1.js" />
/// <reference path="../../src/common/A7.Collection.ts" />
/// <reference path="../../declarations/jasmine.d.ts" />
describe('A Select', function () {
    var collection;

    beforeEach(function () {
        collection = new A7.Collection([1, 2, 3]);
        collection = collection.Select(function (x) {
            return x.toString();
        });
    });

    it('should convert all items in array', function () {
        expect(collection.ToArray()).toEqual(['1', '2', '3']);
    });

    it('should return an array with same length as inputted array', function () {
        expect(collection.Length()).toEqual(3);
    });
});
