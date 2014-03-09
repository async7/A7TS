/// <reference path="A7.Collection.ts" />
/// <reference path="../../declarations/jquery.d.ts" />
var A7;
(function (A7) {
    (function (AJAX) {
        function executeRequest(url, data, dataType, httpVerb, cache, contentType) {
            var dfd = $.Deferred();

            if (contentType == 'application/json')
                data = JSON.stringify(data);

            $.ajax(url, {
                type: httpVerb,
                data: data,
                dataType: dataType,
                contentType: contentType,
                cache: cache,
                success: function (result) {
                    dfd.resolve(result);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if ((AJAX.ErrorHandler || [])[jqXHR.status]) {
                        AJAX.ErrorHandler[jqXHR.status](jqXHR, textStatus, errorThrown);
                    }
                    dfd.reject(jqXHR, textStatus, errorThrown);
                }
            });

            return dfd.promise();
        }

        AJAX.ErrorHandler = [];

        function Put(url, data, dataType, cache, contentType) {
            if (typeof dataType === "undefined") { dataType = "json"; }
            if (typeof cache === "undefined") { cache = false; }
            if (typeof contentType === "undefined") { contentType = "application/json"; }
            return executeRequest(url, data, dataType, 'put', false, contentType);
        }
        AJAX.Put = Put;

        function Get(url, data, dataType, cache, contentType) {
            if (typeof dataType === "undefined") { dataType = "json"; }
            if (typeof cache === "undefined") { cache = false; }
            if (typeof contentType === "undefined") { contentType = "application/x-www-form-urlencoded"; }
            return executeRequest(url, data, dataType, 'get', false, contentType);
        }
        AJAX.Get = Get;

        function GetCollection(url, data, dataType, cache, contentType) {
            if (typeof dataType === "undefined") { dataType = "json"; }
            if (typeof cache === "undefined") { cache = false; }
            if (typeof contentType === "undefined") { contentType = "application/x-www-form-urlencoded"; }
            var dfd = $.Deferred();

            executeRequest(url, data, dataType, 'get', false, contentType).then(function (results) {
                return dfd.resolve(new A7.Collection(results));
            }, dfd.reject);

            return dfd.promise();
        }
        AJAX.GetCollection = GetCollection;

        function GetHtml(url, cache) {
            if (typeof cache === "undefined") { cache = false; }
            return this.Get(url, null, 'html', cache);
        }
        AJAX.GetHtml = GetHtml;

        function Post(url, data, dataType, cache, contentType) {
            if (typeof dataType === "undefined") { dataType = "json"; }
            if (typeof cache === "undefined") { cache = false; }
            if (typeof contentType === "undefined") { contentType = "application/json"; }
            return executeRequest(url, data, dataType, 'post', false, contentType);
        }
        AJAX.Post = Post;

        function Delete(url, data, dataType, cache, contentType) {
            if (typeof dataType === "undefined") { dataType = "json"; }
            if (typeof cache === "undefined") { cache = false; }
            if (typeof contentType === "undefined") { contentType = "application/json"; }
            return executeRequest(url, data, dataType, 'delete', false, contentType);
        }
        AJAX.Delete = Delete;
    })(A7.AJAX || (A7.AJAX = {}));
    var AJAX = A7.AJAX;
})(A7 || (A7 = {}));
