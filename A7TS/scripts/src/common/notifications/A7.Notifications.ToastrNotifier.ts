/// <reference path="../../../declarations/toastr.d.ts" />
/// <reference path="A7.Notifications.INotifier.ts" />

module A7.Notifications {

    export class ToastrNotifier implements INotifier {        

        constructor(toastrOptions?: ToastrOptions) {
            toastr.options = toastrOptions;
        }

        Error(message: string, title: string = null) {
            toastr.error(message, title);
        }

        Info(message: string, title: string = null) {
            toastr.info(message, title);
        }

        Success(message: string, title: string = null) {
            toastr.success(message, title);
        }

        Warning(message: string, title: string = null) {
            toastr.warning(message, title);
        }
    }

}