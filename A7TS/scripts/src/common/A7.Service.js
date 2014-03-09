///<reference path="A7.AJAX.ts" />
///<reference path="../../declarations/jquery.d.ts" />
var A7;
(function (A7) {
    var Service = (function () {
        function Service(url) {
            this.CREATED_EVENT = 'Created';
            this.UPDATED_EVENT = 'Updated';
            this.DELETED_EVENT = 'Deleted';
            this._url = url;
        }
        Service.prototype.handleWebRequest = function (promise, eventName) {
            if (typeof eventName === "undefined") { eventName = null; }
            var dfd = $.Deferred(), __this = this;

            $.when(promise).done(function (response) {
                !eventName || $(__this).trigger(eventName, [response]);
                dfd.resolve(response);
            }).fail(dfd.reject);

            return dfd.promise();
        };

        Service.prototype.GetById = function (id) {
            return this.handleWebRequest(A7.AJAX.Get(this._url + '/' + id));
        };

        Service.prototype.Insert = function (model) {
            return this.handleWebRequest(A7.AJAX.Post(this._url, model), this.CREATED_EVENT);
        };

        Service.prototype.Update = function (model) {
            return this.handleWebRequest(A7.AJAX.Put(this._url, model), this.UPDATED_EVENT);
        };

        Service.prototype.DeleteById = function (id) {
            return this.handleWebRequest(A7.AJAX.Delete(this._url + '/' + id), this.DELETED_EVENT);
        };

        Service.prototype.OnCreate = function (fnHandler) {
            $(this).on(this.CREATED_EVENT, fnHandler);
        };

        Service.prototype.OnUpdate = function (fnHandler) {
            $(this).on(this.UPDATED_EVENT, fnHandler);
        };

        Service.prototype.OnDelete = function (fnHandler) {
            $(this).on(this.DELETED_EVENT, fnHandler);
        };

        Service.prototype.OnModified = function (fnHandler) {
            var _this = this;
            this.OnCreate(function (event, response) {
                fnHandler(event, response, _this.CREATED_EVENT);
            });
            this.OnUpdate(function (event, response) {
                fnHandler(event, response, _this.UPDATED_EVENT);
            });
            this.OnDelete(function (event, response) {
                fnHandler(event, response, _this.DELETED_EVENT);
            });
        };
        return Service;
    })();
    A7.Service = Service;
})(A7 || (A7 = {}));
