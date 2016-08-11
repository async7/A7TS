/// <reference path="../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../../../declarations/jqueryui/jqueryui.d.ts" />
/// <reference path="../http/a7.http.httpclient.ts" />

module A7.Core {
    export class Component {
        _$el: JQuery;        
        _initialized: boolean = false;
        _cacheProvider: A7.Cache.ICacheProvider;
        _selector: string;

        constructor(selector: string, cacheProvider: A7.Cache.ICacheProvider = null)
        {
            this._selector = selector;
            this._$el = $(selector);
            this._cacheProvider = cacheProvider;
            alert('run');
            console.log(this.constructor.toString().match(/function\s*(\w+)/)[1]);
        }        

        _Initialize(fnInit: () => JQueryPromise<any>): JQueryPromise<any> {
            var dfd = $.Deferred();

            if (!this._initialized) {
                fnInit().then(() => {
                    this._$el.show();
                    this._initialized = true;
                    dfd.resolve();
                });
            } else {
                this._$el.show('fade', 200);
                dfd.resolve();
            }

            return dfd.promise();
        }

        _LoadView(url: string, fromCache: boolean = false): JQueryPromise<any> {
            var dfd = $.Deferred();
            Http.HttpClient.GetHtml(url, fromCache).then(html => {
                this._$el.html(html);
                dfd.resolve();
            });
            return dfd.promise();
        }        
        
        Hide(): void {
            this._$el.hide();
        }

        Show(...options: any[]): void {
            this._$el.show('fade', 200);
        }
    
    }
}