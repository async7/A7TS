/// <reference path="../../../../declarations/jquery/jquery.d.ts" />
/// <reference path="../../../../declarations/jqueryui/jqueryui.d.ts" />
/// <reference path="../http/httpclient.ts" />
/// <reference path="../configuration/configurationmanager.ts" />
/// <reference path="../configuration/componentoptions.ts" />
/// <reference path="../utilities/objectutility.ts" />
/// <reference path="../logging/logmanager.ts" />
/// <reference path="../logging/ilogger.ts" />

namespace A7.Core {
    export class Component {
        protected _$el: JQuery;        
        protected _initialized: boolean = false;
        protected _componentOptions: Configuration.ComponentOptions;
        protected _logger: Logging.ILogger;

        constructor()
        {
            var componentName = Utilities.ObjectUtility.GetObjectName(this);

            this._logger = Logging.LogManager.GetLogger(componentName);
            this._componentOptions = Configuration.ConfigurationManager.GetComponentOptions(componentName);
            this._$el = $(this._componentOptions.Selector);

            this._logger.trace('trace');
            this._logger.log('log');
            this._logger.error('error message');
            this._logger.warn('warn message');
            this._logger.info('info message');
            //console.log(this.constructor.toString().match(/function\s*(\w+)/)[1]);


        }        

        protected _initialize(fnInit: () => JQueryPromise<any>, viewUrl: string = null): JQueryPromise<any> {
            var dfd = $.Deferred();
                
                //viewUrl = viewUrl ||

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

