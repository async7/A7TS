/// <reference path="../../../declarations/toastr.d.ts" />
/// <reference path="A7.Notifications.INotifier.ts" />
var A7;
(function (A7) {
    (function (Notifications) {
        var ToastrNotifier = (function () {
            function ToastrNotifier(toastrOptions) {
                toastr.options = toastrOptions;
            }
            ToastrNotifier.prototype.Error = function (message, title) {
                if (typeof title === "undefined") { title = null; }
                toastr.error(message, title);
            };

            ToastrNotifier.prototype.Info = function (message, title) {
                if (typeof title === "undefined") { title = null; }
                toastr.info(message, title);
            };

            ToastrNotifier.prototype.Success = function (message, title) {
                if (typeof title === "undefined") { title = null; }
                toastr.success(message, title);
            };

            ToastrNotifier.prototype.Warning = function (message, title) {
                if (typeof title === "undefined") { title = null; }
                toastr.warning(message, title);
            };
            return ToastrNotifier;
        })();
        Notifications.ToastrNotifier = ToastrNotifier;
    })(A7.Notifications || (A7.Notifications = {}));
    var Notifications = A7.Notifications;
})(A7 || (A7 = {}));
