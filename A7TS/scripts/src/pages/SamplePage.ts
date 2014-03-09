/// <reference path="../components/home/RecentLogTable.ts" />
/// <reference path="../../declarations/jquery.d.ts" />
/// <reference path="../common/A7.Page.ts" />

class HomePage extends A7.Page {

    private _recentLogTable: Components.Home.RecentLogTable;

    private _logService: Services.Interfaces.ILogService;

    constructor() {
        super();

        this._logService = new Services.MockLogService('/api/log');
        this._recentLogTable = new Components.Home.RecentLogTable('#logTable', this._logService);

    }

}

$(() => new HomePage());
