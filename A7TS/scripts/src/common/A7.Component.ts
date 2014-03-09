/// <reference path="cache/A7.Cache.ICacheProvider.ts" />
/// <reference path="A7.AJAX.ts" />
/// <reference path="../../declarations/jquery.d.ts" />

module A7 {
    export class Component {
        _$el: JQuery;        
        _initialized: boolean = false;
        _cacheProvider: A7.Cache.ICacheProvider;
        

        constructor(selector: string, cacheProvider: A7.Cache.ICacheProvider = null) {
            this._$el = $(selector);
            this._cacheProvider = cacheProvider;
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
                this._$el.show();
                dfd.resolve();
            }

            return dfd.promise();
        }

        _LoadView(url: string, fromCache: boolean = false): JQueryPromise<any> {
            var dfd = $.Deferred();
            A7.AJAX.GetHtml(url, fromCache).then(html => {
                this._$el.html(html);
                dfd.resolve();
            });
            return dfd.promise();
        }        
        
        Hide(): void {
            this._$el.hide();
        }

        Show(...options: any[]): void {
            this._$el.show(options);
        }
    
    }
}