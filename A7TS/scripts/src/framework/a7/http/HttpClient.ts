/// <reference path="../collections/collection.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Http {
    export module HttpClient {

        function executeRequest<T>(url: string, data: any, dataType: string, httpVerb: string, cache: boolean, contentType: string): JQueryPromise<T> {
            var dfd = $.Deferred<T>();

            if (contentType == 'application/json') data = JSON.stringify(data);

            $.ajax(url, {
                type: httpVerb,
                data: data,
                dataType: dataType,
                contentType: contentType,
                cache: cache,
                success: function (result) {
                    dfd.resolve(<T>result);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if ((ErrorHandler || [])[jqXHR.status]) { ErrorHandler[jqXHR.status](jqXHR, textStatus, errorThrown); }
                    dfd.reject(jqXHR, textStatus, errorThrown);                    
                }
            });

            return dfd.promise();
        }

        export var ErrorHandler: { (jqXHR: JQueryXHR, textStatus: string, errorThrown: string): void; }[] = [];

        export function Put<T>(url: string, data?: any, dataType: string = "json", cache: boolean = false, contentType: string = "application/json"): JQueryPromise<T> {
            return executeRequest<T>(url, data, dataType, 'put', false, contentType);
        }

        export function Get<T>(url: string, data?: any, dataType: string = "json", cache: boolean = false, contentType: string = "application/x-www-form-urlencoded"): JQueryPromise<T> {            
            return executeRequest<T>(url, data, dataType, 'get', false, contentType);
        }

        export function GetCollection<T>(url: string, data?: any, dataType: string = "json", cache: boolean = false, contentType: string = "application/x-www-form-urlencoded"): JQueryPromise<Collections.ICollection<T>> {
            var dfd = $.Deferred<Collections.ICollection<T>>();
            
            executeRequest<{}[]>(url, data, dataType, 'get', false, contentType).then(results => dfd.resolve(new Collections.Collection<any>(results)), dfd.reject);

            return dfd.promise();
        }

        export function GetHtml(url: string, cache: boolean = false): JQueryPromise<string> {
            return this.Get(url, null, 'html', cache);
        }
        
        export function Post<T>(url: string, data?: any, dataType: string = "json", cache: boolean = false, contentType: string = "application/json"): JQueryPromise<T> {
            return executeRequest<T>(url, data, dataType, 'post', false, contentType);
        }

        export function Delete<T>(url: string, data?: any, dataType: string = "json", cache: boolean = false, contentType: string = "application/json"): JQueryPromise<T> {
            return executeRequest<T>(url, data, dataType, 'delete', false, contentType);
        }
    }
}



