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
    var MockLogService = (function (_super) {
        __extends(MockLogService, _super);
        function MockLogService(url) {
            if (typeof url === "undefined") { url = 'api/log'; }
            _super.call(this, url);
        }
        MockLogService.prototype.Get = function (onlyLatestLog) {
            if (typeof onlyLatestLog === "undefined") { onlyLatestLog = false; }
            var logs = [
                {
                    GlobalId: 1,
                    Source: 'Sample TS Application',
                    LogType: 'Info',
                    Message: 'This is a sample message',
                    Context: null,
                    PostedDate: '20140310'
                }
            ];
            return A7.AJAX.GetCollection(url);
        };
        return MockLogService;
    })(A7.Service);
    Services.MockLogService = MockLogService;
})(Services || (Services = {}));
