/// <reference path="../components/home/RecentLogTable.ts" />
/// <reference path="../../declarations/jquery.d.ts" />
/// <reference path="../common/A7.Page.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        _super.call(this);

        this._logService = new Services.LogService('/api/log');
        this._recentLogTable = new Components.Home.RecentLogTable('#logTable', this._logService);
    }
    return HomePage;
})(A7.Page);

$(function () {
    return new HomePage();
});
