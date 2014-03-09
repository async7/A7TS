/// <reference path="cache/A7.Cache.ICacheProvider.ts" />
/// <reference path="A7.AJAX.ts" />
/// <reference path="../../declarations/jquery.d.ts" />
var A7;
(function (A7) {
    var Component = (function () {
        function Component(selector, cacheProvider) {
            if (typeof cacheProvider === "undefined") { cacheProvider = null; }
            this._initialized = false;
            this._$el = $(selector);
            this._cacheProvider = cacheProvider;
        }
        Component.prototype._Initialize = function (fnInit) {
            var _this = this;
            var dfd = $.Deferred();

            if (!this._initialized) {
                fnInit().then(function () {
                    _this._$el.show();
                    _this._initialized = true;
                    dfd.resolve();
                });
            } else {
                this._$el.show();
                dfd.resolve();
            }

            return dfd.promise();
        };

        Component.prototype._LoadView = function (url, fromCache) {
            var _this = this;
            if (typeof fromCache === "undefined") { fromCache = false; }
            var dfd = $.Deferred();
            A7.AJAX.GetHtml(url, fromCache).then(function (html) {
                _this._$el.html(html);
                dfd.resolve();
            });
            return dfd.promise();
        };

        Component.prototype.Hide = function () {
            this._$el.hide();
        };

        Component.prototype.Show = function () {
            var options = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                options[_i] = arguments[_i + 0];
            }
            this._$el.show(options);
        };
        return Component;
    })();
    A7.Component = Component;
})(A7 || (A7 = {}));
