
module A7.Notifications {

    export interface IDisplayNotifierMessage {
        (message: string);
        (message: string, title: string);
    }

    export interface INotifier {
        Error: IDisplayNotifierMessage;
        Info: IDisplayNotifierMessage;
        Success: IDisplayNotifierMessage;
        Warning: IDisplayNotifierMessage;
    }

}
