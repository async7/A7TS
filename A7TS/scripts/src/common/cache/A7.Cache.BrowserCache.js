/// <reference path="../A7.Collection.ts" />
/// <reference path="../../../declarations/jquery.d.ts" />
/// <reference path="A7.Cache.ICacheProvider.ts" />
var A7;
(function (A7) {
    (function (Cache) {
        var BrowserCache = (function () {
            function BrowserCache() {
                this._cache = [];
            }
            BrowserCache.prototype.Get = function (key, fn) {
                var _this = this;
                var dfd = $.Deferred();

                if (!this._cache[key]) {
                    $.when(fn()).done(function (value) {
                        _this._cache[key] = value;
                        dfd.resolve(_this._cache[key]);
                    });
                } else {
                    dfd.resolve(this._cache[key]);
                }

                return dfd.promise();
            };

            BrowserCache.prototype.Remove = function (key) {
                delete this._cache[key];
            };

            BrowserCache.prototype.RemoveByStartsWith = function (keyStartsWith) {
                var _this = this;
                var removeKeys = new A7.Collection();

                for (var key in this._cache) {
                    if (key.indexOf(keyStartsWith) == 0)
                        removeKeys.Add(key);
                }

                removeKeys.ForEach(function (key) {
                    delete _this._cache[key];
                });
            };

            BrowserCache.prototype.Flush = function () {
                this._cache = [];
            };
            return BrowserCache;
        })();
        Cache.BrowserCache = BrowserCache;
    })(A7.Cache || (A7.Cache = {}));
    var Cache = A7.Cache;
})(A7 || (A7 = {}));
