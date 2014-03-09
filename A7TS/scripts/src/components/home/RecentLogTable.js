/// <reference path="../../../declarations/moment.d.ts" />
/// <reference path="../../services/LogService.ts" />
/// <reference path="../../common/A7.Component.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Components;
(function (Components) {
    (function (Home) {
        var RecentLogTable = (function (_super) {
            __extends(RecentLogTable, _super);
            function RecentLogTable(selector, logService) {
                _super.call(this, selector);

                this._logService = logService;
                this._$tbody = this._$el.find('tbody');

                this.renderRecentLogTable();
            }
            RecentLogTable.prototype.renderRecentLogTable = function () {
                var _this = this;
                this._logService.Get(true).then(function (logs) {
                    var html = logs.Select(function (log) {
                        return '<tr><td>' + _this.renderLogType(log) + '</td><td>' + log.Source + '</td><td>' + moment(log.PostedDate).calendar() + '</td><td>' + log.Message + '</td></tr>';
                    }).ToArray().join('');
                    _this._$tbody.html(html);
                });
            };

            RecentLogTable.prototype.renderLogType = function (log) {
                var html = '<span class="label label-{labelType}">' + log.LogType + '</span>', labelType = 'default';

                switch (log.LogType.toUpperCase()) {
                    case 'DEBUG':
                        labelType = 'primary';
                        break;
                    case 'INFO':
                        labelType = 'info';
                        break;
                    case 'WARN':
                        labelType = 'warning';
                        break;
                    case 'ERROR':
                        labelType = 'danger';
                        break;
                    case 'FATAL':
                        labelType = 'danger';
                        break;
                    default:
                        labelType = 'default';
                }

                return html.replace('{labelType}', labelType);
            };
            return RecentLogTable;
        })(A7.Component);
        Home.RecentLogTable = RecentLogTable;
    })(Components.Home || (Components.Home = {}));
    var Home = Components.Home;
})(Components || (Components = {}));
