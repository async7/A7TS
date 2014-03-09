/// <reference path="../../declarations/underscore.d.ts" />
var A7;
(function (A7) {
    var Collection = (function () {
        function Collection(collection) {
            if (typeof collection === "undefined") { collection = []; }
            this._collection = collection;
        }
        Collection.prototype.Select = function (iterator) {
            return new Collection(_.map(this._collection, iterator) || []);
        };

        Collection.prototype.Where = function (iterator) {
            return new Collection(_.filter(this._collection, iterator) || []);
        };

        Collection.prototype.ForEach = function (iterator) {
            _.forEach(this._collection, iterator);
        };

        Collection.prototype.OrderByProperty = function (propertyName, direction) {
            if (typeof direction === "undefined") { direction = 'asc'; }
            this._collection = _.sortBy(this._collection, propertyName);
            if (direction == 'desc')
                this._collection.reverse();
            return this;
        };

        Collection.prototype.OrderByIterator = function (iterator) {
            this._collection = _.sortBy(this._collection, iterator);
            return this;
        };

        Collection.prototype.Pluck = function (propertyName) {
            return new Collection(_.pluck(this._collection, propertyName) || []);
        };

        Collection.prototype.Reduce = function (iterator, memo) {
            return new Collection(_.reduce(this._collection, iterator, memo) || []);
        };

        Collection.prototype.Any = function (iterator) {
            return _.some(this._collection, iterator);
        };

        Collection.prototype.Contains = function (value) {
            return _.contains(this._collection, value);
        };

        Collection.prototype.First = function (iterator) {
            return _.find(this._collection, iterator);
        };

        Collection.prototype.Reverse = function () {
            return new Collection(this._collection.reverse());
        };

        //alias: for Count
        Collection.prototype.Length = function () {
            return this.Count();
        };

        Collection.prototype.Count = function () {
            return this._collection.length;
        };

        Collection.prototype.Item = function (index) {
            return this._collection[index];
        };

        Collection.prototype.Push = function (item) {
            this._collection.push(item);
        };

        //alias: for Push
        Collection.prototype.Add = function (item) {
            this.Push(item);
        };

        Collection.prototype.ToArray = function () {
            return this._collection;
        };
        return Collection;
    })();
    A7.Collection = Collection;
})(A7 || (A7 = {}));
