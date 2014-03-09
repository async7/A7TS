/// <reference path="../../../declarations/moment.d.ts" />
/// <reference path="../../services/LogService.ts" />
/// <reference path="../../common/A7.Component.ts" />


module Components.Home {

    export class RecentLogTable extends A7.Component {

        private _logService: Services.Interfaces.ILogService;

        private _$tbody: JQuery;

        constructor(selector: string, logService: Services.Interfaces.ILogService) {
            super(selector);

            this._logService = logService;
            this._$tbody = this._$el.find('tbody');

            this.renderRecentLogTable();
        }     

        private renderRecentLogTable() {

            this._logService.Get(true).then(logs => {
                var html = logs.Select(log => '<tr><td>' + this.renderLogType(log) + '</td><td>' + log.Source + '</td><td>' + moment(log.PostedDate).calendar() + '</td><td>' + log.Message + '</td></tr>').ToArray().join('');                               
                this._$tbody.html(html);
            });

        }         

        private renderLogType(log: Models.Log) {
            var html = '<span class="label label-{labelType}">' + log.LogType + '</span>',
                labelType = 'default';

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
        }
           

    }

}