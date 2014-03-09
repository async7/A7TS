/// <chutzpah_reference path="../../lib/underscore-1.5.1.js" />
/// <reference path="../../src/common/A7.Collection.ts" />
/// <reference path="../../declarations/jasmine.d.ts" />

describe('A Select', () => {
    var collection: A7.ICollection<any>;
    
    beforeEach(() => {
        collection = new A7.Collection([1, 2, 3]);
        collection = collection.Select(x => x.toString());
    });

    it('should convert all items in array', () => {        
        expect(collection.ToArray()).toEqual(['1', '2', '3']);
    });

    it('should return an array with same length as inputted array', () => {
        expect(collection.Length()).toEqual(3);
    });

});