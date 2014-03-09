/// <reference path="../common/A7.Service.ts" />
/// <reference path="../models/Log.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Services;
(function (Services) {
    var LogService = (function (_super) {
        __extends(LogService, _super);
        function LogService(url) {
            if (typeof url === "undefined") { url = 'api/log'; }
            _super.call(this, url);
        }
        //Example Concrete Implementation calling to Web API (use A7TSGenerator project to automate this)
        LogService.prototype.Get = function (onlyLatestLog) {
            if (typeof onlyLatestLog === "undefined") { onlyLatestLog = false; }
            var url = this._url + '?onlylatestlog={onlylatestlog}';
            url = url.replace(/{onlyLatestLog}/gi, onlyLatestLog.toString());
            return A7.AJAX.GetCollection(url);
        };
        return LogService;
    })(A7.Service);
    Services.LogService = LogService;
})(Services || (Services = {}));
