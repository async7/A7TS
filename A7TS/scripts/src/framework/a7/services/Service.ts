/// <reference path="../http/httpclient.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Services {

    export class Service {

        CREATED_EVENT: string = 'Created';
        UPDATED_EVENT: string = 'Updated';
        DELETED_EVENT: string = 'Deleted';

        _url: string;

        handleWebRequest<T>(promise: JQueryPromise<T>, eventName: string = null): JQueryPromise<T> {
            var dfd = $.Deferred<T>(),
                __this = this;

            $.when<T>(promise)
                .done(function (response) {
                    !eventName || $(__this).trigger(eventName, [response]);
                    dfd.resolve(response);
                })
                .fail(dfd.reject);

            return dfd.promise();
        }

        constructor(url: string) {
            this._url = url;
        }

        GetUrl(): string {
            return this._url;
        }

        Insert<T>(model: T): JQueryPromise<T> {
            return this.handleWebRequest<T>(Http.HttpClient.Post<T>(this._url, model), this.CREATED_EVENT)
        }

        Update<T>(model: T): JQueryPromise<T> {
            return this.handleWebRequest<T>(Http.HttpClient.Put<T>(this._url, model), this.UPDATED_EVENT)
        }

        DeleteById(id: number): JQueryPromise<any> {
            return this.handleWebRequest(Http.HttpClient.Delete(this._url + '/' + id), this.DELETED_EVENT)
        }

        OnCreate<T>(fnHandler: (event: JQueryEventObject, model: T) => void) {
            $(this).on(this.CREATED_EVENT, fnHandler);
        }

        OnUpdate<T>(fnHandler: (event: JQueryEventObject, model: T) => void) {
            $(this).on(this.UPDATED_EVENT, fnHandler);
        }

        OnDelete<T>(fnHandler: (event: JQueryEventObject, model: T) => void) {
            $(this).on(this.DELETED_EVENT, fnHandler);
        }

        OnModified<T>(fnHandler: (event: JQueryEventObject, model: T, eventType: string) => void) {
            this.OnCreate<T>((event, response) => { fnHandler(event, response, this.CREATED_EVENT); });
            this.OnUpdate<T>((event, response) => { fnHandler(event, response, this.UPDATED_EVENT); });
            this.OnDelete<T>((event, response) => { fnHandler(event, response, this.DELETED_EVENT); });
        }


    }

}