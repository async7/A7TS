/// <reference path="../common/A7.Service.ts" />
/// <reference path="../models/Log.ts" />

module Services {

    export class LogService extends A7.Service implements Interfaces.ILogService {

        constructor(url = 'api/log') {
            super(url);
        }

        //Example Concrete Implementation calling to Web API (use A7TSGenerator project to automate this)
        Get(onlyLatestLog: boolean = false): JQueryPromise<A7.ICollection<Models.Log>> {
            var url = this._url + '?onlylatestlog={onlylatestlog}';
            url = url.replace(/{onlyLatestLog}/gi, onlyLatestLog.toString());
            return A7.AJAX.GetCollection(url);
        }

    }

}

module Services.Interfaces {

    export interface ILogService {
        Get(onlyLatestLog?: boolean): JQueryPromise<A7.ICollection<Models.Log>>;

        OnCreate<T>(fnHandler: (event: JQueryEventObject, model: T) => void);

        OnUpdate<T>(fnHandler: (event: JQueryEventObject, model: T) => void);

        OnDelete<T>(fnHandler: (event: JQueryEventObject, model: T) => void);

        OnModified<T>(fnHandler: (event: JQueryEventObject, model: T, eventType: string) => void);
    }

}