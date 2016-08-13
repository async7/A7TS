/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../../../../declarations/jqueryui/jqueryui.d.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="../configuration/configurationmanager.ts" />

namespace A7.Core {
    export class Component {
        protected _$el: JQuery;        
        protected _initialized: boolean = false;

        constructor()
        {
            //this._$el = $(Configuration.ConfigurationManager.AppConfiguration.);

            //console.log(this.constructor.toString().match(/function\s*(\w+)/)[1]);
        }        

        protected _initialize(fnInit: () => JQueryPromise<any>): JQueryPromise<any> {
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

        protected _loadView(url: string, fromCache: boolean = false): JQueryPromise<any> {
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

