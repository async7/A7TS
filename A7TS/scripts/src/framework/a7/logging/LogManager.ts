/// <reference path="emptylogger.ts" />
/// <reference path="consolelogger.ts" />
/// <reference path="ilogger.ts" />
/// <reference path="../configuration/configuration.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Logging {

    export module LogManager {

        export function GetLogger(loggerName: string): JQueryPromise<ILogger> {
            //Fix for < IE9 missing console
            if (typeof console == "undefined" || typeof console.log == "undefined") {
                return $.Deferred().resolve(new EmptyLogger());
            } else {
                var onLogResolved = $.Deferred();

                Configuration.GetAppConfiguration().then(config => {
                    onLogResolved.resolve(config.EnableLogging ? new ConsoleLogger(loggerName) : new EmptyLogger());
                });

                return onLogResolved.promise();
            }
        }

    }

}