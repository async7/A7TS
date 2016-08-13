/// <reference path="emptylogger.ts" />
/// <reference path="consolelogger.ts" />
/// <reference path="ilogger.ts" />
/// <reference path="../configuration/configurationmanager.ts" />
/// <reference path="../../../../declarations/jquery/jquery.d.ts" />

namespace A7.Logging {

    export module LogManager {

        export function GetLogger(loggerName: string): ILogger {
            //Fix for < IE9 missing console
            if (typeof console == "undefined" || typeof console.log == "undefined") {
                return new EmptyLogger();
            } else {
                var config = Configuration.ConfigurationManager.AppConfiguration;
                return config.EnableLogging ? new ConsoleLogger(loggerName) : new EmptyLogger();
            }
        }

    }

}